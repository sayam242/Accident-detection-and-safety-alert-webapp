const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DIGITS_ONLY_REGEX = /^\d+$/;
const ALLOWED_SEVERITIES = ["critical", "moderate", "low"];

export function sanitizeInput(value = "") {
	if (value === null || value === undefined) return "";
	return String(value).trim();
}

export function isRequired(value) {
	return sanitizeInput(value).length > 0;
}

export function isValidEmail(email) {
	const normalized = sanitizeInput(email).toLowerCase();
	if (!normalized) return false;
	return EMAIL_REGEX.test(normalized);
}

export function getPhoneDigits(phone) {
	return String(phone || "").replace(/\D/g, "");
}

export function isValidPhone(phone, { minLength = 10, maxLength = 15 } = {}) {
	const digits = getPhoneDigits(phone);
	return digits.length >= minLength && digits.length <= maxLength;
}

export function isValidOtp(otp, { length = 6 } = {}) {
	const value = sanitizeInput(otp);
	return value.length === length && DIGITS_ONLY_REGEX.test(value);
}

export function isValidSeverity(severity) {
	const value = sanitizeInput(severity).toLowerCase();
	return ALLOWED_SEVERITIES.includes(value);
}

export function isValidGeoPoint(location) {
	if (!location || location.type !== "Point" || !Array.isArray(location.coordinates)) {
		return false;
	}

	const [lng, lat] = location.coordinates;
	if (!Number.isFinite(lng) || !Number.isFinite(lat)) return false;
	return lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
}

function setError(errors, key, condition, message) {
	if (!condition) {
		errors[key] = message;
	}
}

export function validateLoginForm(form = {}) {
	const errors = {};
	const email = sanitizeInput(form.email);
	const password = sanitizeInput(form.password);

	setError(errors, "email", isRequired(email), "Email is required");
	setError(errors, "email", !email || isValidEmail(email), "Enter a valid email address");
	setError(errors, "password", isRequired(password), "Password is required");

	return {
		isValid: Object.keys(errors).length === 0,
		errors,
	};
}

export function validateSignupForm(form = {}) {
	const errors = {};
	const hospitalname = sanitizeInput(form.hospitalname);
	const email = sanitizeInput(form.email);
	const password = sanitizeInput(form.password);
	const location = form.location;

	setError(errors, "hospitalname", isRequired(hospitalname), "Hospital name is required");
	setError(errors, "email", isRequired(email), "Email is required");
	setError(errors, "email", !email || isValidEmail(email), "Enter a valid email address");
	setError(errors, "password", isRequired(password), "Password is required");
	setError(errors, "location", isValidGeoPoint(location), "Please select a valid location");

	return {
		isValid: Object.keys(errors).length === 0,
		errors,
	};
}

export function validateReportForm(form = {}, options = {}) {
	const {
		requireImage = false,
		requireOtpVerified = false,
		otpVerified = true,
	} = options;

	const errors = {};
	const name = sanitizeInput(form.name);
	const contact = sanitizeInput(form.contact);
	const severity = sanitizeInput(form.severity).toLowerCase();
	const location = form.location;
	const image = form.image;

	setError(errors, "name", isRequired(name), "Name is required");
	setError(errors, "contact", isRequired(contact), "Contact number is required");
	setError(errors, "contact", !contact || isValidPhone(contact, { minLength: 10, maxLength: 10 }), "Contact must be a 10-digit number");
	setError(errors, "severity", isRequired(severity), "Severity is required");
	setError(errors, "severity", !severity || isValidSeverity(severity), "Severity must be low, moderate, or critical");
	setError(errors, "location", isValidGeoPoint(location), "Please select a valid location");

	if (requireImage) {
		setError(errors, "image", Boolean(image), "Image is required");
	}

	if (requireOtpVerified) {
		setError(errors, "otp", Boolean(otpVerified), "Please verify OTP before submitting");
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors,
	};
}

export function validateOtpPayload({ phone, otp } = {}) {
	const errors = {};

	setError(errors, "phone", isValidPhone(phone, { minLength: 10, maxLength: 10 }), "Phone must be a 10-digit number");

	if (otp !== undefined) {
		setError(errors, "otp", isValidOtp(otp), "OTP must be a 6-digit number");
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors,
	};
}

export function getFirstValidationError(errors = {}) {
	const keys = Object.keys(errors);
	if (!keys.length) return "";
	return errors[keys[0]] || "";
}

export default {
	sanitizeInput,
	isRequired,
	isValidEmail,
	getPhoneDigits,
	isValidPhone,
	isValidOtp,
	isValidSeverity,
	isValidGeoPoint,
	validateLoginForm,
	validateSignupForm,
	validateReportForm,
	validateOtpPayload,
	getFirstValidationError,
};
