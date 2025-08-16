// middlewares/hospiAuth.js
import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import Hospital from "../models/accounts/Hospital.js";

const SECRET = process.env.JWT_SECRET;

export const hospiAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ message: "Unauthorized: Missing Bearer token" });
    }

    // Verify with explicit algorithm to avoid mismatch
    const decoded = jwt.verify(token, SECRET, { algorithms: ["HS256"] });

    if (!decoded || decoded.role !== "hospital") {
      return res.status(403).json({ message: "Forbidden: Role mismatch" });
    }

    const hospital = await Hospital.findById(decoded.id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    req.hospital = hospital;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(401).json({ message: "Unauthorized" });
  }
};
