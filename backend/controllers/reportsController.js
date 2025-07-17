

const Report = require("../models/accidents/Reports.js"); 
const imagekit = require("../config/imagekit.js"); 



// Create a new report


  const createReport = async (req, res) => {
    try {
        const { title, description, images } = req.body;

        // Validate required fields
        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required" });
        }

        // Upload images to ImageKit
        const uploadedImages = [];
        for (const image of images) {
            const uploadResponse = await imagekit.upload({
                file: image, // Base64 encoded image
                fileName: `${Date.now()}-${image.originalname}`
            });
            uploadedImages.push(uploadResponse.url);
        }

        // Create report in database
        const report = await Report.create({
            title,
            description,
            images: uploadedImages
        });

        res.status(201).json(report);
    } catch (error) {
        console.error("Error creating report:", error);
        res.status(500).json({ error: "Failed to create report" });
    }
};

// Get all reports with pagination

 const getAllReports = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const reports = await Report.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json(reports);
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ error: "Failed to fetch reports" });
    }
};

// Get a single report by ID
 const getReportById = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await Report.findById(id);
        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }
        res.status(200).json(report);
    } catch (error) {
        console.error("Error fetching report by ID:", error);
        res.status(500).json({ error: "Failed to fetch report" });
    }
};  


// Update a report by ID
 const updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedReport = await Report.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedReport) {
            return res.status(404).json({ error: "Report not found" });
        }
        res.status(200).json(updatedReport);
    } catch (error) {
        console.error("Error updating report:", error);
        res.status(500).json({ error: "Failed to update report" });
    }
};

// Delete a report by ID
 const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReport = await Report.findByIdAndDelete(id);
        if (!deletedReport) {
            return res.status(404).json({ error: "Report not found" });
        }
        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        console.error("Error deleting report:", error);
        res.status(500).json({ error: "Failed to delete report" });
    }
};


module.exports = {
    createReport,
    getAllReports,
    getReportById,
    updateReport,
    deleteReport,}
