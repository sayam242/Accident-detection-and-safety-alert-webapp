import dotenv from "dotenv";
dotenv.config();
import express from "express";
import twilio from "twilio";
import OTPModel from "../models/Otp.js"; // Make sure your Otp.js uses export default


const router = express.Router();
console.log("TWILIO_ACCOUNT_SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN);

// Twilio setup (read from .env)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

console.log('Twilio SID:', accountSid); // Should start with 'AC'
console.log('Twilio Token:', authToken); // Should be a string, not undefined

const client = twilio(accountSid, authToken);



// Send OTP
router.post("/send-otp", async (req, res) => {
  try {
    console.log('Twilio SID:', accountSid); // Should start with 'AC'
console.log('Twilio Token:', authToken); // Should be a string, not undefined

    const { phone } = req.body;
    console.log("Sending OTP to:", phone);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to DB
    await OTPModel.create({
      phone,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // expires in 5 minutes
    });

    // Send via Twilio
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, // set in .env
      to: `+91${phone}`,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, error: "Failed to send OTP" });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const record = await OTPModel.findOne({ phone, otp });

    if (record && record.expiresAt > Date.now()) {
      await OTPModel.deleteOne({ _id: record._id });
      res.json({ verified: true });
    } else {
      res.json({ verified: false });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ verified: false, error: "Verification failed" });
  }
});

export default router;
