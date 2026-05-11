import Response from "../models/accidents/Response.js";
import Report from "../models/accidents/Reports.js";
import Responded from "../models/accidents/Responded.js";
import Hospital from "../models/accounts/Hospital.js";
import Ambulance from "../models/ambulances/Ambulance.js";
import { getIO } from "../socket.js";

/* ================= CREATE RESPONSE ================= */
export const createResponse = async (req, res) => {
  try {
    const hospital = req.hospital;
    let { accident, ambulance, estimatedTimeToReach } = req.body;

    if (!accident || !ambulance || estimatedTimeToReach == null) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // normalize ETA (minutes)
    estimatedTimeToReach = Number(estimatedTimeToReach);

    const accidentDoc = await Report.findById(accident);
    if (!accidentDoc) {
      return res.status(404).json({
        success: false,
        message: "Accident not found",
      });
    }

    const amb = await Ambulance.findOne({
      _id: ambulance,
      hospital: hospital._id,
      status: "available",
    });

    if (!amb) {
      return res.status(400).json({
        success: false,
        message: "Ambulance not available",
      });
    }

    const alreadyResponded = await Response.findOne({
      accident,
      hospital: hospital._id,
    });

    if (alreadyResponded) {
      return res.status(409).json({
        success: false,
        message: "You have already responded",
      });
    }

    const existingResponses = await Response.find({ accident });
    const fastestETA =
      existingResponses.length > 0
        ? Math.min(...existingResponses.map(r => r.estimatedTimeToReach))
        : Infinity;

    if (estimatedTimeToReach > fastestETA + 5) {
      return res.status(403).json({
        success: false,
        message: "Slower than current fastest response",
      });
    }

    const expectedArrivalAt = new Date(
      Date.now() + estimatedTimeToReach * 60 * 1000
    );

    const response = await Response.create({
      accident,
      hospital: hospital._id,
      hospitalName: hospital.hospitalname,
      ambulance,
      estimatedTimeToReach,
      expectedArrivalAt,
      status: "winning",
      finalized: false,
    });

    await Response.updateMany(
      { accident, _id: { $ne: response._id } },
      { status: "outbid" }
    );

    amb.status = "busy";
    amb.currentAccident = accident;
    await amb.save();

    const io = getIO();
    io.to(`accident:${accident}`).emit("new-response", {
      accidentId: accident,
      response,
    });

    res.status(201).json({
      success: true,
      response,
    });

  } catch (err) {
    console.error("Error creating response:", err);
    res.status(500).json({
      success: false,
      message: "Failed to submit response",
    });
  }
};

export const getResponsesByAccident = async (req, res) => {
  try {
    const { accidentId } = req.params;

    const responses = await Response.find({ accident: accidentId })
      .sort({ estimatedTimeToReach: 1 });

    res.json({ success: true, responses });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch responses",
    });
  }
};

/* ================= FINALIZE ARRIVED ================= */
export const finalizeArrivedResponses = async () => {
  const now = new Date();

  const arrivedResponses = await Response.find({
    status: "winning",
    finalized: false,
    expectedArrivalAt: { $lte: now },
  });

  for (const res of arrivedResponses) {

    // HARD LOCK
    const locked = await Response.findOneAndUpdate(
      { _id: res._id, finalized: false },
      { finalized: true },
      { new: true }
    );

    if (!locked) continue;

    const report = await Report.findById(res.accident);
    if (!report) continue;

    const hospital = await Hospital.findById(res.hospital);
    if (!hospital) continue;

    await Responded.create({
      name: report.name,
      contact: report.contact,
      severity: report.severity,
      location: report.location,
      image: report.image,
      timeDetected: report.timeDetected,
      hospitalName: hospital.hospitalname,
      hospitalEmail: hospital.email,
      timeResponded: new Date(),
    });



    await Report.findByIdAndDelete(report._id);
    await Response.deleteMany({ accident: report._id });

    const io = getIO();
    io.emit("report-finalized", { reportId: report._id });
  }
};
