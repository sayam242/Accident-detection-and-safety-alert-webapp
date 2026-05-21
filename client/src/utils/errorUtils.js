/**
 * Extract error message safely from various error formats
 * @param {any} error - error object or response
 * @param {string} defaultMsg - fallback message
 */
export function getErrorMessage(error, defaultMsg = "An error occurred") {
  if (typeof error === "string") return error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  if (error?.data?.message) return error.data.message;
  return defaultMsg;
}

/**
 * Extract error status code
 */
export function getErrorStatus(error) {
  return error?.response?.status || null;
}

/**
 * Check if error is 401 (unauthorized)
 */
export function isUnauthorizedError(error) {
  return getErrorStatus(error) === 401;
}

/**
 * Format error for display in alerts
 */
export function formatErrorAlert(error, prefix = "❌") {
  const msg = getErrorMessage(error);
  return `${prefix} ${msg}`;
}
