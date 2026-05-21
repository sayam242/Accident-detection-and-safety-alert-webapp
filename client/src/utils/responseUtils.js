/**
 * Parse API response safely
 * Handles both array and object responses
 */
export function parseResponse(response) {
  if (!response) return null;
  return response.data || response;
}

/**
 * Extract success flag from response
 */
export function isSuccessResponse(response) {
  return response?.data?.success === true || response?.success === true;
}

/**
 * Extract data field from response (handles various formats)
 */
export function getResponseData(response) {
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response)) return response;
  return response?.data || response;
}

/**
 * Extract message field from response
 */
export function getResponseMessage(response) {
  return response?.data?.message || response?.message || null;
}
