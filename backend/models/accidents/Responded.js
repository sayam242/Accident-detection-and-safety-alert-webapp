import mongoose from "mongoose";

const respondedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hospitalName: {
    type: String,
    required: true,
  },
  hospitalEmail:{
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
  
  timeResponded: {
    type: Date,
    default: Date.now,
  },
});


respondedSchema.index({ location: "2dsphere" });

export default mongoose.model("Responded", respondedSchema);
