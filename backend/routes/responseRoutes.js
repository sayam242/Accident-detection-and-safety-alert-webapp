import express from "express";
import { hospiAuth } from "../middlewares/hospiAuth.js";
import { createResponse } from "../controllers/responseController.js";
import { getResponsesByAccident } from "../controllers/responseController.js";

const router = express.Router();

router.post("/", hospiAuth, createResponse);
router.get("/:accidentId", hospiAuth, getResponsesByAccident);


export default router;
