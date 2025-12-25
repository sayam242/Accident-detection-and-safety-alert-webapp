import express from "express";
import { hospiAuth } from "../middlewares/hospiAuth.js";
import {
  getMyAmbulances,
  createAmbulance,
  updateAmbulance,
  changeAmbulanceStatus,
} from "../controllers/ambulanceController.js";

const router = express.Router();



router.get("/", hospiAuth, getMyAmbulances);
router.post("/", hospiAuth, createAmbulance);
router.put("/:id", hospiAuth, updateAmbulance);
router.patch("/:id/status", hospiAuth, changeAmbulanceStatus);

export default router;
