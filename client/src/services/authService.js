import apiClient, { setAuthToken } from "./apiClient";
import { AUTH_ENDPOINTS } from "../constants/apiConstants";

/**
 * Login with email and password
 * Returns { token, hospital }
 */
export async function login(email, password) {
  try {
    const res = await apiClient.post(AUTH_ENDPOINTS.LOGIN, { email, password });
    if (res.data?.success) {
      const { token, hospital } = res.data;
      if (token) {
        setAuthToken(token);
        localStorage.setItem("hospitalId", hospital._id);
        localStorage.setItem("hospitalLocation", hospital.location?.coordinates || "");
      }
      return { success: true, token, hospital, message: "Login successful" };
    }
    return { success: false, message: res.data?.message || "Login failed" };
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Server error";
    return { success: false, message };
  }
}

/**
 * Sign up / create hospital account
 * Expects { hospitalname, email, password, location }
 */
export async function signup(accountDetails) {
  try {
    const res = await apiClient.post(AUTH_ENDPOINTS.SIGNUP, accountDetails);
    if (res.status === 201 || res.status === 200) {
      return { success: true, message: "Hospital registered successfully" };
    }
    return { success: false, message: res.data?.message || "Registration failed" };
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Server error";
    return { success: false, message };
  }
}

/**
 * Logout: clear auth state
 */
export function logout() {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("hospitalId");
    localStorage.removeItem("hospitalLocation");
    setAuthToken(null);
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

/**
 * Get stored token
 */
export function getToken() {
  try {
    return localStorage.getItem("token");
  } catch (e) {
    return null;
  }
}

/**
 * Get stored hospital ID
 */
export function getHospitalId() {
  try {
    return localStorage.getItem("hospitalId");
  } catch (e) {
    return null;
  }
}

/**
 * Get stored hospital location
 */
export function getHospitalLocation() {
  try {
    return localStorage.getItem("hospitalLocation");
  } catch (e) {
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  return !!getToken();
}
