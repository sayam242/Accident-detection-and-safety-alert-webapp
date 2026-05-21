import apiClient from "./apiClient";
import { OTP_ENDPOINTS } from "../constants/apiConstants";

/**
 * Send OTP to phone number
 * @param {string} phone - phone number (10 digits)
 */
export async function sendOtp(phone) {
  try {
    const res = await apiClient.post(OTP_ENDPOINTS.SEND, { phone });
    if (res.data?.success) {
      return { success: true, message: "OTP sent successfully" };
    }
    return { success: false, message: res.data?.message || "Failed to send OTP" };
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Server error";
    return { success: false, message };
  }
}

/**
 * Verify OTP for a phone number
 * @param {string} phone - phone number
 * @param {string} otp - OTP code
 */
export async function verifyOtp(phone, otp) {
  try {
    const res = await apiClient.post(OTP_ENDPOINTS.VERIFY, { phone, otp });
    if (res.data?.verified) {
      return { success: true, verified: true, message: "OTP verified successfully" };
    }
    return { success: false, verified: false, message: res.data?.message || "OTP verification failed" };
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Server error";
    return { success: false, verified: false, message };
  }
}
