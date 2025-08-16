import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  hospitalname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Optional: create 2dsphere index for geospatial queries
hospitalSchema.index({ location: "2dsphere" });

export default mongoose.model("Hospital", hospitalSchema);
