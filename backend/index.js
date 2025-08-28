import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import detectedRoutes from "./routes/detectedRoutes.js";
import respondedRoutes from "./routes/respondedRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";

const app = express();

// CORS first
app.use(cors({
origin: "https://vigilant-live.vercel.app",
methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"],
credentials: false
}));

// Preflight helper and Vary header
app.use((req, res, next) => {
res.header("Vary", "Origin");
if (req.method === "OPTIONS") {
res.header("Access-Control-Allow-Origin", "https://vigilant-live.vercel.app");
res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
return res.sendStatus(204);
}
next();
});
/* ------------ Body parsers ------------ */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ------------ API routes ------------ */
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/detected", detectedRoutes);
app.use("/api/responded", respondedRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/pdf", pdfRoutes); // final PDF URL: /api/pdf/report/:id

/* ------------ MongoDB ------------ */
app.get("/", (_req, res) => res.send("API is running..."));
mongoose
  .connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* ------------ Server ------------ */
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Listening to port ${PORT}`);
// });
export default app;