import express from "express";
import Responded from "../models/accidents/Responded.js";
import { hospiAuth } from "../middlewares/hospiAuth.js";

const router = express.Router();

// Get all responded reports for logged-in hospital
router.get("/my", hospiAuth, async (req, res) => {
  try {
    const hospital = req.hospital;

    const reports = await Responded.find({
      hospitalEmail: hospital.email, // or hospital._id if you store that
    }).sort({ timeResponded: -1 });

    return res.json({ success: true, data: reports });
  } catch (err) {
    console.error("Error fetching responded reports:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error fetching responded reports" });
  }
});

export default router;
