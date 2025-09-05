"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const crops = [
  "Wheat",
  "Rice",
  "Maize",
  "Soybean",
  "Sugarcane",
  "Cotton",
  "Pulses",
  "Mustard",
];

const states = [
  "Rajasthan",
  "Punjab",
  "Haryana",
  "Uttar Pradesh",
  "Madhya Pradesh",
  "Gujarat",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Andhra Pradesh",
  "Telangana",
  "Bihar",
  "West Bengal",
  "Odisha",
  "Assam",
  "Kerala",
  "Jharkhand",
  "Chhattisgarh",
];

export default function PredictPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    crop: "Wheat",
    state: "Rajasthan",
    district: "",
    areaHectare: "",
    sowingDate: "",
    soilN: "",
    soilP: "",
    soilK: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    // quick validation
    if (!form.district || !form.areaHectare || !form.sowingDate) {
      setError("Please fill district, area and sowing date.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          areaHectare: parseFloat(form.areaHectare),
          soilN: form.soilN ? parseFloat(form.soilN) : null,
          soilP: form.soilP ? parseFloat(form.soilP) : null,
          soilK: form.soilK ? parseFloat(form.soilK) : null,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Prediction failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white">Yield Prediction</h1>
      <p className="mt-2 text-slate-300">
        Enter basic details to get yield estimates and actionable advisory.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm text-slate-300 mb-2">Crop</label>
            <select
              name="crop"
              value={form.crop}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {crops.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">State</label>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              District
            </label>
            <input
              name="district"
              value={form.district}
              onChange={handleChange}
              placeholder="e.g., Jaipur"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 text-white px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Area (hectares)
            </label>
            <input
              name="areaHectare"
              type="number"
              step="0.01"
              value={form.areaHectare}
              onChange={handleChange}
              placeholder="e.g., 2.5"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 text-white px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Sowing Date
            </label>
            <input
              name="sowingDate"
              type="date"
              value={form.sowingDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-slate-300 mb-2">
                Soil N
              </label>
              <input
                name="soilN"
                type="number"
                step="0.01"
                value={form.soilN}
                onChange={handleChange}
                placeholder="mg/kg"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 text-white px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-2">
                Soil P
              </label>
              <input
                name="soilP"
                type="number"
                step="0.01"
                value={form.soilP}
                onChange={handleChange}
                placeholder="mg/kg"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 text-white px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-2">
                Soil K
              </label>
              <input
                name="soilK"
                type="number"
                step="0.01"
                value={form.soilK}
                onChange={handleChange}
                placeholder="mg/kg"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 text-white px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-white font-medium shadow hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition disabled:opacity-60"
          >
            {loading ? "Predicting..." : "Predict Yield"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-slate-100 hover:bg-slate-800 transition"
          >
            Cancel
          </button>
        </div>

        {error && (
          <div className="mt-2 rounded-lg border border-red-800 bg-red-900/30 p-3 text-red-200">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-4 rounded-xl border border-emerald-800 bg-emerald-900/20 p-4">
            <h3 className="font-semibold text-white">Prediction</h3>
            <p className="mt-1 text-slate-200">
              Estimated yield:{" "}
              <span className="font-semibold">{result?.prediction} q/ha</span>
            </p>

            <div className="mt-3">
              <h4 className="font-semibold text-white">Recommendations</h4>
              <ul className="mt-2 list-disc pl-5 text-slate-200">
                {result?.recommendations?.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
