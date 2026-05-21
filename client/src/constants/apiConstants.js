/**
 * API Endpoints and Constants
 */

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  SIGNUP: "/api/auth/create2",
};

// Report endpoints
export const REPORT_ENDPOINTS = {
  CREATE: "/api/reports/create",
  GET_ALL: "/api/reports",
  GET_ONE: (id) => `/api/reports/${id}`,
  UPDATE: (id) => `/api/reports/${id}`,
  DELETE: (id) => `/api/reports/${id}`,
  GET_RESPONDED: "/api/responded",
};

// Ambulance endpoints
export const AMBULANCE_ENDPOINTS = {
  GET_ALL: "/api/ambulances",
  GET_ONE: (id) => `/api/ambulances/${id}`,
  CREATE: "/api/ambulances",
  UPDATE_STATUS: (id) => `/api/ambulances/${id}/status`,
  DELETE: (id) => `/api/ambulances/${id}`,
};

// OTP endpoints
export const OTP_ENDPOINTS = {
  SEND: "/api/otp/send-otp",
  VERIFY: "/api/otp/verify-otp",
};

// API Timeouts
export const API_TIMEOUT = 15000; // 15 seconds

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
};
