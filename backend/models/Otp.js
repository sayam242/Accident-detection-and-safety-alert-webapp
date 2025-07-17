const mongoose = require('mongoose');
const OTPSchema = new mongoose.Schema({
  phone: String,
  otp: String,
  expiresAt: Date
});
module.exports = mongoose.model('OTP', OTPSchema);