import express from "express";
import PDFDocument from "pdfkit";
import axios from "axios";
import mongoose from "mongoose";
import Report from "../models/accidents/Reports.js";
import { hospiAuth } from "../middlewares/hospiAuth.js";

const router = express.Router();

/* ---------- Utils ---------- */
function addHeader(doc, title = "Accident Report") {
  doc.fontSize(20).fillColor("#111827").text(title, { align: "center" });
  doc
    .moveDown(0.5)
    .fontSize(10)
    .fillColor("#6B7280")
    .text(`Generated on ${new Date().toLocaleString()}`, { align: "center" })
    .moveDown(1);
  doc
    .moveTo(40, doc.y)
    .lineTo(doc.page.width - 40, doc.y)
    .strokeColor("#E5E7EB")
    .stroke()
    .moveDown(1);
}

function addKeyValue(doc, key, value, keyWidth = 120) {
  const y = doc.y;
  const x = doc.x;
  doc.fontSize(10).fillColor("#6B7280").text(String(key), x, y, { width: keyWidth });
  doc.fontSize(12).fillColor("#111827").text(String(value ?? "—"), x + keyWidth + 6, y).moveDown(0.6);
}

async function embedRemoteImage(doc, url, maxWidth = 480, maxHeight = 280) {
  try {
    const res = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: 8000, // avoid hanging
      headers: {
        // Some CDNs require a UA; adjust if your ImageKit config needs CORS headers
        "User-Agent": "pdfkit-image-fetch/1.0",
      },
    });
    const imgBuffer = Buffer.from(res.data);
    doc.image(imgBuffer, { fit: [maxWidth, maxHeight], align: "center", valign: "center" });
    doc.moveDown(0.8);
    return true;
  } catch (e) {
    doc.fontSize(10).fillColor("#DC2626").text("Scene image could not be embedded.", { align: "left" }).moveDown(0.5);
    return false;
  }
}

/* ---------- Health check to confirm mount ---------- */
router.get("/ping", (_req, res) => res.json({ ok: true }));

/* ---------- GET /api/pdf/report/:id ---------- */
router.get("/report/:id", hospiAuth, async (req, res) => {
  // Important: no async/await outside try before headers are set
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid report id" });
    }

    const report = await Report.findById(id).lean();
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const hospital = req.hospital;

    // Prepare headers BEFORE piping
    const filename = `Accident_Report_${id}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    // Create and pipe the PDF document
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    doc.pipe(res);

    // Header
    addHeader(doc);

    // Summary section
    const coords = report.location?.coordinates;
    const locText = Array.isArray(coords) ? `${coords[0]}, ${coords[1]}` : "—";
    const when = new Date(report.timeDetected || report.createdAt || Date.now());
    const distance = report.distanceKm != null ? `${report.distanceKm} km` : "Unknown";

    // Two-column layout
    const col1X = 40; // left margin
    const col2X = doc.page.width / 2 + 10;
    const startY = doc.y;

    // Left column
    doc.save();
    doc.text("", col1X, startY);
    addKeyValue(doc, "Report ID", report._id);
    addKeyValue(doc, "Time", when.toLocaleString());
    addKeyValue(doc, "Severity", report.severity || "Moderate");
    addKeyValue(doc, "Status", report.status || "Pending");
    addKeyValue(doc, "Distance", distance);
    doc.restore();

    // Right column
    doc.save();
    doc.text("", col2X, startY);
    addKeyValue(doc, "Location", locText);
    addKeyValue(doc, "Name", report.name || "—");
    addKeyValue(doc, "Contact", report.contact || "—");
    addKeyValue(doc, "Type", report.type || "—");
    addKeyValue(doc, "Vehicle", report.vehicle || "—");
    addKeyValue(doc, "Number", report.number || "—");
    doc.restore();

    doc.moveDown(1);
    doc
      .moveTo(40, doc.y)
      .lineTo(doc.page.width - 40, doc.y)
      .strokeColor("#E5E7EB")
      .stroke()
      .moveDown(1);

    // Scene image
    if (report.image) {
      doc.fontSize(12).fillColor("#111827").text("Scene Image", { align: "left" }).moveDown(0.4);
      await embedRemoteImage(doc, report.image);
    }

    // Footer
    doc.moveDown(1);
    doc
      .moveTo(40, doc.y)
      .lineTo(doc.page.width - 40, doc.y)
      .strokeColor("#E5E7EB")
      .stroke()
      .moveDown(0.6);
    doc
      .fontSize(9)
      .fillColor("#6B7280")
      .text(`Generated for: ${hospital?.hospitalname || hospital?.email || "Hospital"}`, { align: "left" })
      .text(`Email: ${hospital?.email || "—"}`, { align: "left" });

    doc.end();
  } catch (error) {
    console.error("PDF generation error:", error);
    // If streaming already started, do not write JSON; just end
    if (!res.headersSent) {
      return res.status(500).json({ message: "Failed to generate PDF" });
    }
    try { res.end(); } catch {}
  }
});

export default router;
