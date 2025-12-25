import mongoose from "mongoose";

const ambulanceSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
      index: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
      trim: true,
    },

    driverName: {
      type: String,
      trim: true,
    },

    driverContact: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["available", "busy", "disabled"],
      default: "available",
    },

    // if busy, which accident is it assigned to
    currentAccident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      default: null,
    },
  },
  { timestamps: true }
);

// One hospital should not have duplicate vehicle numbers
ambulanceSchema.index(
  { hospital: 1, vehicleNumber: 1 },
  { unique: true }
);

export default mongoose.model("Ambulance", ambulanceSchema);
