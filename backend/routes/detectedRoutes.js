const express   = require("express");
const mongoose  = require("mongoose");
const router    = express.Router();


const Hospital = require("../models/accounts/Hospital");
const Detected = require("../models/accidents/Detected");

/* ---------- helper: Haversine in km ---------- */
function haversine([lon1, lat1], [lon2, lat2]) {
  const R = 6371;
  const toRad = d => (d * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ---------- GET  /api/reports?hospitalId=xxx ---------- */
router.get("/", async (req, res) => {
  try {
    /* 1️⃣  clean & validate ID */
    let { hospitalId } = req.query;
    hospitalId = hospitalId?.replace(/['"]/g, "");   // strip stray quotes

    if (!mongoose.Types.ObjectId.isValid(hospitalId))
      return res.status(400).json({ success: false, message: "Invalid hospitalId" });

    /* 2️⃣  fetch hospital */
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital?.location?.coordinates?.length)
      return res.status(404).json({ success: false, message: "Hospital location not found" });

    const hospCoords = hospital.location.coordinates;       // [lon, lat]

    /* 3️⃣  fetch accident reports */
    const reports = await Detected.find({});

    /* 4️⃣  enrich with distance */
    const enriched = reports.map(r => {
      const accCoords = r.location?.coordinates;
      if (!accCoords) {
        return { ...r.toObject(), distance: "Unknown" };
      }
      const dist = haversine(hospCoords, accCoords).toFixed(2) + " km";
      return { ...r.toObject(), distance: dist };
    });

    return res.json({ success: true, reports: enriched });
  } catch (err) {
    console.error("Error fetching reports:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch reports" });
  }
});

/* simple health‑check */
router.get("/test", (_req, res) => res.send("✅ detectedRoutes working"));

module.exports = router;