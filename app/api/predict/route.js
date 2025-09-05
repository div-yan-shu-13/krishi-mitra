// app/api/predict/route.js
import { NextResponse } from "next/server";

// Simple per‑crop demo ranges (purely illustrative placeholders)
const CROP_RANGES = {
  Wheat: [18, 42],
  Rice: [22, 48],
  Maize: [16, 38],
  Soybean: [8, 18],
  Sugarcane: [600, 900], // if using q/ha
  Cotton: [12, 28],
  Pulses: [8, 16],
  Mustard: [10, 20],
  default: [12, 36],
};

// RNG using Web Crypto when available (Node 19+), with a safe fallback
function rand01() {
  if (globalThis.crypto?.getRandomValues) {
    const u32 = new Uint32Array(1);
    globalThis.crypto.getRandomValues(u32);
    return u32 / 2 ** 32;
  }
  return Math.random();
}

function pickInRange(min, max) {
  const r = rand01();
  return min + r * (max - min);
}

function jitter(x, pct = 0.08) {
  const j = (rand01() * 2 - 1) * pct; // +/- pct
  return x * (1 + j);
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const crop = body?.crop;
    const [min, max] = CROP_RANGES[crop] ?? CROP_RANGES.default;

    // Base random in range with a small jitter so repeated calls vary naturally
    let predicted = pickInRange(min, max);
    predicted = Math.round(jitter(predicted) * 10) / 10;

    // Lightweight, varied recommendations to keep UI lively
    const recs = [];
    if (rand01() > 0.5)
      recs.push(
        "Irrigation: plan an early morning cycle to reduce evaporation."
      );
    if (rand01() > 0.5)
      recs.push(
        "Nutrients: apply a split N dose and monitor leaf color weekly."
      );
    if (rand01() > 0.5)
      recs.push(
        "IPM: scout twice a week; rotate actives to prevent resistance."
      );
    if (recs.length === 0)
      recs.push(
        "Field check: monitor soil moisture and weed pressure this week."
      );

    // Return the same JSON shape your UI already expects
    const res = NextResponse.json({
      prediction: predicted,
      recommendations: recs,
      context: {
        crop: crop ?? null,
        state: body?.state ?? null,
        district: body?.district ?? null,
        sowingDate: body?.sowingDate ?? null,
      },
      mock: true,
    });

    // Ensure no caching so every submit returns a fresh random
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return res;
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Mock error" },
      { status: 500 }
    );
  }
}
