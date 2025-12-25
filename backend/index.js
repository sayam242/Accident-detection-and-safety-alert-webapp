import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { initSocket } from "./socket.js";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import respondedRoutes from "./routes/respondedRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import ambulanceRoutes from "./routes/ambulanceRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";

const app = express();
const CLIENT_URL = process.env.CLIENT_URL;

// CORS first
app.use(cors({
origin: CLIENT_URL,
methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"],
credentials: false
}));

// Preflight helper and Vary header
app.use((req, res, next) => {
res.header("Vary", "Origin");
if (req.method === "OPTIONS") {
res.header("Access-Control-Allow-Origin", CLIENT_URL);
res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
return res.sendStatus(204);
}
next();
});
/* ------------ Body parsers ------------ */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


/* ------------ API routes ------------ */
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/responded", respondedRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/pdf", pdfRoutes); // final PDF URL: /api/pdf/report/:id
app.use("/api/ambulances", ambulanceRoutes);
app.use("/api/responses", responseRoutes);


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
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Initialize socket.io
initSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running on port ${PORT}`);
});

export default app;