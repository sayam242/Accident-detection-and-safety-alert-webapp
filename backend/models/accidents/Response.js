import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    accident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
      index: true,
    },

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
      index: true, // 🔹 helps queries
    },

    hospitalName: {
      type: String,
      required: true,
    },

    ambulance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ambulance",
      required: true,
    },

    estimatedTimeToReach: {
      type: Number,
      required: true,
      min: 0.1,
    },

    expectedArrivalAt: {
      type: Date,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["active", "outbid", "winning", "finalized"],
      default: "active",
      index: true, // 🔹 useful for fast lookups
    },
    finalized: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

// ✅ Prevent multiple responses from same hospital for same accident
responseSchema.index(
  { accident: 1, hospital: 1 },
  { unique: true }
);

export default mongoose.model("Response", responseSchema);
