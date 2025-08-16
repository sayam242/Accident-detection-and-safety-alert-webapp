import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Import route files
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import detectedRoutes from "./routes/detectedRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/detected", detectedRoutes);
app.use("/api/otp", otpRoutes);

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/adrs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(3000, () => {
  console.log("Listening to port 3000");
});
