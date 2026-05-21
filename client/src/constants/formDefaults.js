/**
 * Default form values for initialization
 */

// Login form
export const LOGIN_FORM_DEFAULTS = {
  email: "",
  password: "",
};

// Sign up / Hospital registration form
export const SIGNUP_FORM_DEFAULTS = {
  hospitalname: "",
  email: "",
  password: "",
  location: null,
};

// Report / Accident reporting form
export const REPORT_FORM_DEFAULTS = {
  name: "",
  contact: "",
  severity: "",
  location: null,
  image: null,
};

// OTP verification form
export const OTP_FORM_DEFAULTS = {
  phone: "",
  otp: "",
  otpSent: false,
  otpVerified: false,
};

// Severity options
export const SEVERITY_OPTIONS = [
  { label: "Low", value: "Low" },
  { label: "Moderate", value: "Moderate" },
  { label: "Critical", value: "Critical" },
];

// Ambulance status options
export const AMBULANCE_STATUS_OPTIONS = [
  { label: "Available", value: "available" },
  { label: "Disabled", value: "disabled" },
];

// Add ambulance form defaults
export const AMBULANCE_FORM_DEFAULTS = {
  vehicleNumber: "",
  driverName: "",
  driverContact: "",
};

// Location selection options
export const LOCATION_OPTIONS = [
  { label: "Current Location", value: "current-location" },
  { label: "Select on Map", value: "select-on-map" },
];
