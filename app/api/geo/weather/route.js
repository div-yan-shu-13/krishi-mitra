export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return Response.json({ error: "Missing lat or lon" }, { status: 400 });
    }

    // Build Open‑Meteo request: current weather + daily precipitation
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", String(lat));
    url.searchParams.set("longitude", String(lon));
    url.searchParams.set("timezone", "auto");
    url.searchParams.set(
      "current",
      "temperature_2m,relative_humidity_2m,precipitation"
    );
    url.searchParams.set("daily", "precipitation_sum");

    // Abort after 8s
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const resp = await fetch(url.toString(), {
      signal: controller.signal,
      // Disable caching for freshest data during development
      next: { revalidate: 0 },
    });

    clearTimeout(timeout);

    if (!resp.ok) {
      const text = await resp.text();
      return Response.json(
        { error: `Upstream error: ${resp.status} ${text}` },
        { status: 502 }
      );
    }

    const data = await resp.json();

    // Return a trimmed payload the UI expects
    return Response.json({
      current: {
        temperature_2m: data?.current?.temperature_2m ?? null,
        relative_humidity_2m: data?.current?.relative_humidity_2m ?? null,
        precipitation: data?.current?.precipitation ?? null,
      },
      daily: {
        time: data?.daily?.time ?? [],
        precipitation_sum: data?.daily?.precipitation_sum ?? [],
      },
      daily_units: data?.daily_units ?? {},
      latitude: data?.latitude,
      longitude: data?.longitude,
      timezone: data?.timezone,
    });
  } catch (err) {
    const message =
      err?.name === "AbortError"
        ? "Weather request timed out"
        : err?.message || "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
