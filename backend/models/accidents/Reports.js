import mongoose from "mongoose";

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
  image: {
    type: String,
    required: true,
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
