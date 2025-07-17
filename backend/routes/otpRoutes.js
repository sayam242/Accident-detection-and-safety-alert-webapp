const express = require('express');
const router = express.Router();
require('dotenv').config();
const twilio = require('twilio');
const OTPModel = require('../models/Otp.js'); // You need to create this model

// const accountSid = 'ACc1fe262774aa192397b1c0c7c7e4d322';
// const authToken = '185bd63ed774ff8df7780afb90940252';
// const client = twilio(accountSid, authToken);

// Send OTP
router.post('/send-otp', async (req, res) => {
  console.log("Sending OTP to:", req.body.phone);
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP to DB
  await OTPModel.create({ phone, otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // 5 min expiry

  // Send SMS
  await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: 'YOUR_TWILIO_PHONE_NUMBER',
    to: `+91${phone}`
  });

  res.json({ success: true });
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  const record = await OTPModel.findOne({ phone, otp });

  if (record && record.expiresAt > Date.now()) {
    // Optionally, delete OTP after verification
    await OTPModel.deleteOne({ _id: record._id });
    res.json({ verified: true });
  } else {
    res.json({ verified: false });
  }
});

module.exports = router;