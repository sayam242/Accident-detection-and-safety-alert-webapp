import Ambulance from "../models/ambulances/Ambulance.js";

/**
 * GET /api/ambulances
 * Get all ambulances of logged-in hospital
 */
export const getMyAmbulances = async (req, res) => {
  try {
    const hospitalId = req.hospital._id;

    const ambulances = await Ambulance.find({ hospital: hospitalId })
      .sort({ createdAt: -1 });

    res.json({ success: true, ambulances });
  } catch (err) {
    console.error("Fetch ambulances error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch ambulances" });
  }
};

/**
 * POST /api/ambulances
 * Add new ambulance
 */
export const createAmbulance = async (req, res) => {
  try {
    const hospitalId = req.hospital._id;
    const { vehicleNumber, driverName, driverContact } = req.body;

    if (!vehicleNumber) {
      return res.status(400).json({ message: "Vehicle number is required" });
    }

    const ambulance = await Ambulance.create({
      hospital: hospitalId,
      vehicleNumber,
      driverName,
      driverContact,
    });

    res.status(201).json({
      success: true,
      ambulance,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Ambulance with this vehicle number already exists",
      });
    }
    console.error("Create ambulance error:", err);
    res.status(500).json({ success: false, message: "Failed to add ambulance" });
  }
};

/**
 * PUT /api/ambulances/:id
 * Update ambulance details
 */
export const updateAmbulance = async (req, res) => {
  try {
    const hospitalId = req.hospital._id;
    const { id } = req.params;

    const ambulance = await Ambulance.findOne({
      _id: id,
      hospital: hospitalId,
    });

    if (!ambulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    Object.assign(ambulance, req.body);
    await ambulance.save();

    res.json({ success: true, ambulance });
  } catch (err) {
    console.error("Update ambulance error:", err);
    res.status(500).json({ success: false, message: "Failed to update ambulance" });
  }
};

/**
 * PATCH /api/ambulances/:id/status
 * Enable / disable ambulance
 */
export const changeAmbulanceStatus = async (req, res) => {
  try {
    const hospitalId = req.hospital._id;
    const { id } = req.params;
    const { status } = req.body;

    if (!["available", "disabled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const ambulance = await Ambulance.findOne({
      _id: id,
      hospital: hospitalId,
    });

    if (!ambulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    // 🔓 MANUAL OVERRIDE
    if (ambulance.status === "busy" && status === "available") {
      ambulance.status = "available";
      ambulance.currentAccident = null;
    } else {
      ambulance.status = status;
    }

    await ambulance.save();

    res.json({
      success: true,
      ambulance,
      message: "Ambulance status updated",
    });
  } catch (err) {
    console.error("Change ambulance status error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};
