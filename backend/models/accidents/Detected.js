import mongoose from "mongoose";

const detectedSchema = new mongoose.Schema({
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  severity: {
    type: String,
    enum: ["Critical", "Moderate", "Low"], // your 3 options
    default: "Moderate",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"], // must be 'Point'
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      validate: {
        validator: (v) => v.length === 2,
        message: "Coordinates must be [lng, lat]",
      },
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

export default mongoose.model("Detected", detectedSchema);
