import { useState } from "react";
import { sendOtp as sendOtpService, verifyOtp as verifyOtpService } from "../services/otpService";

/**
 * Hook for OTP verification flow
 * Manages OTP state and handles send/verify operations
 * @returns {object} - { otp, otpSent, otpVerified, setOtp, sendOtp, verifyOtp, reset, loading, error }
 */
export function useOtp() {
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Send OTP to phone number
   * @param {string} phone - phone number (10 digits)
   * @returns {boolean} - success status
   */
  const sendOtp = async (phone) => {
    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number");
      return false;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await sendOtpService(phone);
      if (result.success) {
        setOtpSent(true);
        setError(null);
        return true;
      } else {
        setError(result.message || "Failed to send OTP");
        return false;
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Server error";
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verify OTP code
   * @param {string} phone - phone number
   * @param {string} otpCode - OTP code (optional, uses state if not provided)
   * @returns {boolean} - verification status
   */
  const verifyOtp = async (phone, otpCode = otp) => {
    if (!otpCode) {
      setError("Please enter OTP");
      return false;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await verifyOtpService(phone, otpCode);
      if (result.success && result.verified) {
        setOtpVerified(true);
        setError(null);
        return true;
      } else {
        setError(result.message || "OTP verification failed");
        return false;
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Server error";
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset OTP state
   */
  const reset = () => {
    setOtp("");
    setOtpSent(false);
    setOtpVerified(false);
    setError(null);
  };

  return {
    otp,
    otpSent,
    otpVerified,
    setOtp,
    sendOtp,
    verifyOtp,
    reset,
    loading,
    error,
  };
}
