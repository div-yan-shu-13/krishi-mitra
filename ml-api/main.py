# ml-api/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import numpy as np
import os

# -------- Config --------
ARTIFACT_DIR = os.getenv("ARTIFACT_DIR", "./artifacts")
MODEL_PATH = os.getenv("MODEL_PATH", os.path.join(ARTIFACT_DIR, "model.pkl"))
STD_PATH   = os.getenv("STD_PATH",   os.path.join(ARTIFACT_DIR, "standscaler.pkl"))
MM_PATH    = os.getenv("MM_PATH",    os.path.join(ARTIFACT_DIR, "minmaxscaler.pkl"))
# Choose how to apply scalers if both exist: "std_then_minmax" or "minmax_then_std"
SCALER_ORDER = os.getenv("SCALER_ORDER", "std_then_minmax").strip().lower()

# The model in your notebook uses these 7 features (order matters!)
FEATURE_ORDER = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]

# -------- App --------
app = FastAPI(title="KrishiMitra ML API")

# CORS (relax for dev; restrict in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # set to your site origin in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- Artifacts --------
model = None
std_scaler = None
mm_scaler = None

@app.on_event("startup")
def _load_artifacts():
    global model, std_scaler, mm_scaler
    # Load model
    try:
        model = joblib.load(MODEL_PATH)
    except Exception as e:
        raise RuntimeError(f"Failed to load model: {e}")
    # Load scalers if provided
    try:
        std_scaler = joblib.load(STD_PATH)
    except Exception:
        std_scaler = None
    try:
        mm_scaler = joblib.load(MM_PATH)
    except Exception:
        mm_scaler = None

# -------- Schemas --------
class PredictRequest(BaseModel):
    # Primary 7 features (exactly as trained)
    N: float | None = Field(None, description="Nitrogen")
    P: float | None = Field(None, description="Phosphorus")
    K: float | None = Field(None, description="Potassium")
    temperature: float | None = None
    humidity: float | None = None
    ph: float | None = None
    rainfall: float | None = None

    # Optional aliases (in case the frontend sends soilN/soilP/soilK)
    soilN: float | None = None
    soilP: float | None = None
    soilK: float | None = None

class PredictResponse(BaseModel):
    prediction: float | int | str
    raw_prediction: float | int | str | None = None
    class_label: str | None = None
    details: dict = {}

# -------- Helpers --------
def assemble_feature_vector(req: PredictRequest) -> np.ndarray:
    # Prefer N,P,K if given; else fallback to soilN/soilP/soilK
    vals = {}
    vals["N"] = req.N if req.N is not None else (req.soilN if req.soilN is not None else 0.0)
    vals["P"] = req.P if req.P is not None else (req.soilP if req.soilP is not None else 0.0)
    vals["K"] = req.K if req.K is not None else (req.soilK if req.soilK is not None else 0.0)
    vals["temperature"] = 0.0 if req.temperature is None else float(req.temperature)
    vals["humidity"]    = 0.0 if req.humidity is None else float(req.humidity)
    vals["ph"]          = 0.0 if req.ph is None else float(req.ph)
    vals["rainfall"]    = 0.0 if req.rainfall is None else float(req.rainfall)

    vec = [float(vals[name]) for name in FEATURE_ORDER]
    return np.array([vec], dtype=float)

def apply_scalers(X: np.ndarray) -> np.ndarray:
    # Apply saved scalers on the full 7-feature vector in a configurable order.
    # StandardScaler standardizes features (zero mean, unit variance), while MinMaxScaler scales features to a fixed range; both must reuse training-fit parameters at inference[2][3].
    def can_apply(scaler):
        return hasattr(scaler, "n_features_in_") and scaler.n_features_in_ == X.shape[1]

    order = SCALER_ORDER
    if order == "minmax_then_std":
        if mm_scaler is not None and can_apply(mm_scaler):
            X = mm_scaler.transform(X)
        if std_scaler is not None and can_apply(std_scaler):
            X = std_scaler.transform(X)
    else:  # default: std_then_minmax
        if std_scaler is not None and can_apply(std_scaler):
            X = std_scaler.transform(X)
        if mm_scaler is not None and can_apply(mm_scaler):
            X = mm_scaler.transform(X)
    return X

# -------- Endpoint --------
@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    X = assemble_feature_vector(req)
    X = apply_scalers(X)

    try:
        y = model.predict(X)  # scikit-learn estimator API
        y_val = np.ravel(y)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {e}")

    # Try to expose a human-readable class label if available
    label = None
    try:
        if hasattr(model, "classes_"):
            # If classes_ are strings, map index/value to string label
            # Works whether predict returns the label directly or an index, depending on the estimator
            if isinstance(y_val, (int, np.integer)) and len(model.classes_) > int(y_val) >= 0:
                # Some pipelines predict numeric codes; this maps index -> label if classes_ are strings
                if isinstance(model.classes_[int(y_val)], str):
                    label = str(model.classes_[int(y_val)])
            else:
                # Many classifiers already return the label; if it's a string, use it
                if isinstance(y_val, str):
                    label = y_val
    except Exception:
        label = None

    return PredictResponse(
        prediction=(label if label is not None else y_val),
        raw_prediction=y_val,
        class_label=label,
        details={
            "features_order": FEATURE_ORDER,
            "scaler_order": SCALER_ORDER,
            "std_applied": std_scaler is not None,
            "minmax_applied": mm_scaler is not None,
        },
    )
