import mongoose from "mongoose";

// ⬇️ Put the URL/path of that chassis image here
const DEVICE_PLACEHOLDER_IMAGE =
  "https://ik.imagekit.io/sayam242/Detected.jpg"; 

const reportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  severity: {
    type: String,
    enum: ["Critical", "Moderate", "Low"],
    default: "Moderate",
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
      validate: {
        validator: (v) => v.length === 2,
        message: "Coordinates must be [lng, lat]",
      },
    },
  },

  // 👇 NEW FIELD: who reported this?
  reportedBy: {
    type: String,
    enum: ["webapp", "device"],
    default: "webapp",
  },

  // 👇 image is required only for webapp, and gets a default for device
  image: {
    type: String,
    required: function () {
      return this.reportedBy === "webapp";
    },
    default: function () {
      if (this.reportedBy === "device") {
        return DEVICE_PLACEHOLDER_IMAGE;
      }
      return undefined; // webapp must provide its own image
    },
  },

  status: {
    type: String,
    enum: ["Responded", "Pending", "Cancelled"],
    default: "Pending",
  },
  timeDetected: {
    type: Date,
    default: Date.now,
  },
});

reportSchema.index({ location: "2dsphere" });

export default mongoose.model("Report", reportSchema);
