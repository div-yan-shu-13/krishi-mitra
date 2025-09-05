"use client";

import { useEffect, useState } from "react";

export default function InsightsPage() {
  const [coords, setCoords] = useState(null);
  const [status, setStatus] = useState(
    "Click “Load insights” to detect location and fetch weather."
  );
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

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
        setStatus("Location acquired. Fetching weather...");
        setLoading(true);
        try {
          const res = await fetch(
            `/api/geo/weather?lat=${latitude}&lon=${longitude}`
          );
          if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
          const data = await res.json();
          setWeather(data);
          setStatus("Weather loaded.");
        } catch (e) {
          setStatus(e.message || "Failed to load weather.");
        } finally {
          setLoading(false);
        }
      },
      (err) => setStatus(`Location error: ${err.message}`),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white">Insights</h1>
      <p className="mt-2 text-slate-300">
        Quick glance at local weather using the same API routes used for
        predictions.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={detectAndFetch}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-white font-medium shadow hover:bg-emerald-500 transition disabled:opacity-60"
          >
            {loading ? "Loading..." : "Load insights"}
          </button>
          <span className="text-sm text-slate-300">{status}</span>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <h3 className="font-semibold text-white">Your location</h3>
            <p className="text-sm text-slate-300 mt-2">
              Lat: {coords?.latitude?.toFixed?.(5) ?? "—"} | Lon:{" "}
              {coords?.longitude?.toFixed?.(5) ?? "—"}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <h3 className="font-semibold text-white">Weather now</h3>
            {weather ? (
              <div className="mt-2 text-sm text-slate-200">
                <p>Temp: {weather?.current?.temperature_2m ?? "—"} °C</p>
                <p>
                  Humidity: {weather?.current?.relative_humidity_2m ?? "—"} %
                </p>
                <p>
                  Precipitation today:{" "}
                  {weather?.daily?.precipitation_sum ?? "—"} mm
                </p>
              </div>
            ) : (
              <p className="mt-2 text-slate-300 text-sm">No data loaded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
