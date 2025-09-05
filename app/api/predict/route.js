// app/api/predict/route.js

export async function POST(request) {
  try {
    const body = await request.json();

    const base = process.env.ML_API_URL || "http://localhost:8001";
    const res = await fetch(`${base}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // Always fresh for dev; adjust if caching later
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const text = await res.text();
      return Response.json(
        { error: `ML API error: ${res.status} ${text}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
