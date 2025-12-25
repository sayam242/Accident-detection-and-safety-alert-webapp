// controllers/reportsController.js
import Report from "../models/accidents/Reports.js";
import imagekit from "../config/imagekit.js";
import Responded from "../models/accidents/Responded.js";
import { getIO } from "../socket.js";
const DEVICE_IMAGE =
  "https://ik.imagekit.io/qwykl2wxyq/WhatsApp%20Image%202025-12-12%20at%2013.52.57.jpeg";  // replace with your ImageKit URL

export const createReport = async (req, res) => {
  try {
    const { name, condition, contact, image, location, reportedBy } = req.body;

    if (!name || !contact || !location) {
      return res.status(400).json({
        success: false,
        message: "Name, contact, and location are required",
      });
    }

    if (reportedBy !== "device" && !image) {
      return res.status(400).json({
        success: false,
        message: "Image is required for webapp reports",
      });
    }

    let finalImageURL;

    if (reportedBy !== "device") {
      const uploadResponse = await imagekit.upload({
        file: image,
        fileName: `${Date.now()}.jpg`,
      });
      finalImageURL = uploadResponse.url;
    } else {
      finalImageURL = DEVICE_IMAGE;
    }
    console.log("🧪 createReport controller HIT");

    // ✅ STORE created report
    const report = await Report.create({
      name,
      severity: condition,
      contact,
      reportedBy: reportedBy || "webapp",
      image: finalImageURL,
      location: {
        type: "Point",
        coordinates: location.coordinates,
      },
    });

    // ✅ EMIT SOCKET EVENT BEFORE RESPONSE
    const io = getIO();
    io.emit("new-accident", report);


    // ✅ SEND HTTP RESPONSE LAST
    return res.status(201).json({
      success: true,
      message: "Report created successfully",
      report,
    });

  } catch (error) {
    console.error("Error creating report:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create report",
    });
  }
};



export const getAllReports = async (req, res) => {
  try {
    const hosp = req.hospital;
    const hospCoords = hosp?.location?.coordinates; // [lon, lat]
    if (!hospCoords || hospCoords.length !== 2) {
      return res.status(400).json({ success: false, message: "Hospital location not set" });
    }

    const MAX_DISTANCE_M = 20_000; // 20km

    const reports = await Report.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: hospCoords },
          distanceField: "distanceMeters",
          maxDistance: MAX_DISTANCE_M,
          spherical: true,
          key: "location",
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $addFields: {
          distanceKm: { $round: [{ $divide: ["$distanceMeters", 1000] }, 2] },
        },
      },
      { $project: { distanceMeters: 0 } },
    ]);

    return res.status(200).json({ success: true, reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch reports" });
  }
};


export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    return res.status(200).json({ success: true, report });
  } catch (error) {
    console.error("Error fetching report by ID:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch report" });
  }
};

export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReport = await Report.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedReport) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    return res.status(200).json({ success: true, report: updatedReport });
  } catch (error) {
    console.error("Error updating report:", error);
    return res.status(500).json({ success: false, message: "Failed to update report" });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;   // ✅ match your route /delete/:id
    const hospital = req.hospital; // ✅ comes from hospiAuth middleware

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    // ✅ Create responded entry
    const responded = new Responded({
      name: report.name,
      contact: report.contact,
      severity: report.severity,
      location: report.location,
      image: report.image,
      hospitalName: hospital.hospitalname,
      hospitalEmail: hospital.email,
    });
    console.log( responded);
    await responded.save();

    // ✅ Delete report after saving to responded
    await Report.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Report moved to Responded and deleted successfully",
      responded,
    });
  } catch (error) {
    console.error("Error deleting report:", error);
    return res.status(500).json({ success: false, message: "Failed to delete report" });
  }
};
