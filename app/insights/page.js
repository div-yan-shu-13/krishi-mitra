"use client";

import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function InsightsPage() {
  const [status, setStatus] = useState(
    "Click “Load insights” to detect location and fetch data."
  );
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [soil, setSoil] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const detectAndFetch = () => {
    if (!("geolocation" in navigator)) {
      setStatus("Geolocation not supported by this browser.");
      return;
    }
    setStatus("Requesting location permission...");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
        setStatus("Location acquired. Fetching weather and soil...");
        try {
          const [wRes, sRes] = await Promise.all([
            fetch(`/api/geo/weather?lat=${latitude}&lon=${longitude}`),
            fetch(`/api/geo/soil?lat=${latitude}&lon=${longitude}`),
          ]);
          if (!wRes.ok) throw new Error(`Weather failed: ${wRes.status}`);
          if (!sRes.ok) throw new Error(`Soil failed: ${sRes.status}`);
          const w = await wRes.json();
          const s = await sRes.json();
          setWeather(w);
          setSoil(s);
          // Placeholder crop suggestion heuristic (replace with model later)
          const ph = s?.phh2o?.Q0_5?.["0-5"] ?? null;
          const n = s?.nitrogen?.Q0_5?.["0-5"] ?? null;
          const k = s?.soc?.Q0_5?.["0-5"] ?? null; // SOC isn’t K, but used here as a mock proxy for page fill
          const picks = [];
          if (ph && ph >= 6 && ph <= 7.5) picks.push("Wheat");
          if (ph && ph >= 5.5 && ph <= 7) picks.push("Rice");
          if (n && n >= 0.8) picks.push("Maize");
          if (picks.length === 0) picks.push("Soybean", "Pulses");
          setSuggestions(picks.slice(0, 3));
          setStatus("Insights loaded.");
        } catch (e) {
          setStatus(e.message || "Failed to load insights.");
        }
      },
      (err) => setStatus(`Location error: ${err.message}`),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Weather chart data (daily precipitation)
  const precipData = {
    labels: weather?.daily?.time ?? [],
    datasets: [
      {
        label: "Precipitation (mm)",
        data: weather?.daily?.precipitation_sum ?? [],
        borderColor: "rgba(16,185,129,1)",
        backgroundColor: "rgba(16,185,129,0.2)",
        tension: 0.3,
      },
    ],
  };

  // Soil bar chart (mock: N from nitrogen, P unavailable -> 0, K mocked from SOC to fill chart)
  const soilN = soil?.nitrogen?.Q0_5?.["0-5"] ?? 0;
  const soilP = 0; // not available from current endpoint; reserve for future
  const soilK = (soil?.soc?.Q0_5?.["0-5"] ?? 0) * 0.5; // mock proxy for demo visuals
  const soilData = {
    labels: ["N (g/kg)", "P (g/kg)", "K (g/kg)"],
    datasets: [
      {
        label: "Topsoil 0–5 cm",
        data: [soilN, soilP, soilK],
        backgroundColor: ["#34d399", "#60a5fa", "#a78bfa"],
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white">Insights</h1>
      <p className="mt-2 text-slate-300">
        Location‑aware weather and soil snapshot with suggested crops and quick
        visuals.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={detectAndFetch}
          className="rounded-lg bg-emerald-600 px-4 py-2.5 text-white font-medium shadow hover:bg-emerald-500 transition"
        >
          Load insights
        </button>
        <span className="text-sm text-slate-300">{status}</span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-semibold text-white">Your location</h3>
          <p className="text-sm text-slate-300 mt-2">
            Lat: {coords?.latitude?.toFixed?.(5) ?? "—"} | Lon:{" "}
            {coords?.longitude?.toFixed?.(5) ?? "—"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-semibold text-white">Weather now</h3>
          <div className="mt-2 text-sm text-slate-200">
            <p>Temp: {weather?.current?.temperature_2m ?? "—"} °C</p>
            <p>Humidity: {weather?.current?.relative_humidity_2m ?? "—"} %</p>
            <p>Precip today: {weather?.daily?.precipitation_sum ?? "—"} mm</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-semibold text-white">Precipitation outlook</h3>
          <div className="mt-3 bg-slate-950/60 rounded-lg p-3">
            <Line
              data={precipData}
              options={{
                responsive: true,
                plugins: { legend: { display: true } },
              }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-semibold text-white">Topsoil N‑P‑K (mock)</h3>
          <div className="mt-3 bg-slate-950/60 rounded-lg p-3">
            <Bar
              data={soilData}
              options={{
                responsive: true,
                plugins: { legend: { display: true } },
              }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-400">
            P and K are placeholders until extended soil endpoints or tests are
            integrated.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h3 className="font-semibold text-white">
          Suggested crops (placeholder)
        </h3>
        <p className="mt-2 text-sm text-slate-300">
          Based on current pH and basic nutrients, consider:
        </p>
        <ul className="mt-2 list-disc list-inside text-slate-200">
          {suggestions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-slate-400">
          Suggestions are heuristic placeholders; replace with your model later.
        </p>
      </div>
    </div>
  );
}
