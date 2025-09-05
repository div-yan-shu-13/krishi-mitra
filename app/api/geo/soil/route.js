export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return Response.json({ error: "Missing lat or lon" }, { status: 400 });
    }

    // SoilGrids point query endpoint
    // We request median (Q0.5) at 0–5 cm for phh2o, nitrogen, soc
    const url = new URL(
      "https://rest.isric.org/soilgrids/v2.0/properties/query"
    );
    url.searchParams.set("lat", String(lat));
    url.searchParams.set("lon", String(lon));
    url.searchParams.append("property", "phh2o");
    url.searchParams.append("property", "nitrogen");
    url.searchParams.append("property", "soc");
    url.searchParams.append("depth", "0-5cm");
    url.searchParams.append("value", "Q0.5");

    // 8s timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const resp = await fetch(url.toString(), {
      signal: controller.signal,
      // fresh during development
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

    const raw = await resp.json();

    // Helpers to robustly traverse possible shapes
    const glayers =
      raw?.properties?.layers ||
      raw?.layers ||
      raw?.features?.properties?.glayers ||
      [];

    const findLayer = (name) =>
      Array.isArray(glayers) ? glayers.find((l) => l?.name === name) : null;

    const extractMedianAtTop = (layerName) => {
      const layer = findLayer(layerName);
      if (!layer) return null;

      // Depth object may have various keys; try a few
      const depths = layer?.depths || layer?.units || layer?.values || [];
      if (!Array.isArray(depths)) return null;

      // Find 0–5 cm entry
      const d0 =
        depths.find((d) =>
          String(
            d?.label || d?.range || d?.depth || d?.unit_depth_interval || d
          ).includes("0-5")
        ) || depths;

      if (!d0) return null;

      // Value may live under d0.values['Q0.5'] or similar
      const v =
        d0?.values?.["Q0.5"] ??
        d0?.values?.Q0_5 ??
        d0?.Q0_5 ??
        d0?.median ??
        (typeof d0?.value === "number" ? d0.value : null);

      return typeof v === "number" ? v : null;
    };

    // SoilGrids returns "mapped units" that require conversion to conventional units:
    // phh2o: pH*10 -> divide by 10 to get pH; nitrogen: cg/kg -> divide by 100 to get g/kg; soc: dg/kg -> divide by 10 to get g/kg
    // See ISRIC documentation on conversion factors and depth intervals.[^18_2][^18_1]
    const ph_raw = extractMedianAtTop("phh2o");
    const n_raw = extractMedianAtTop("nitrogen");
    const soc_raw = extractMedianAtTop("soc");

    const ph = typeof ph_raw === "number" ? ph_raw / 10 : null; // pH*10 -> pH
    const nitrogen = typeof n_raw === "number" ? n_raw / 100 : null; // cg/kg -> g/kg
    const soc = typeof soc_raw === "number" ? soc_raw / 10 : null; // dg/kg -> g/kg

    return Response.json({
      // Shape tailored to the Predict page preview fields
      phh2o: {
        Q0_5: { "0-5": ph },
        unit: "pH",
      },
      nitrogen: {
        Q0_5: { "0-5": nitrogen },
        unit: "g/kg",
      },
      soc: {
        Q0_5: { "0-5": soc },
        unit: "g/kg",
      },
      meta: {
        latitude: Number(lat),
        longitude: Number(lon),
        source: "SoilGrids v2.0",
        depth: "0-5cm",
        statistic: "Q0.5",
      },
    });
  } catch (err) {
    const message =
      err?.name === "AbortError"
        ? "Soil request timed out"
        : err?.message || "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
