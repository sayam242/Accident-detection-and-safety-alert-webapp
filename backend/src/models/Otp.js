import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  phone: String,
  otp: String,
  expiresAt: Date,
});

export default mongoose.model("OTP", OTPSchema);
