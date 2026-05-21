/**
 * Format date to locale string
 * @param {string|Date} date - date to format
 */
export function formatDate(date) {
  if (!date) return "—";
  try {
    return new Date(date).toLocaleString();
  } catch (e) {
    return "—";
  }
}

/**
 * Format coordinates to readable string
 * Handles both [lng, lat] and string formats
 */
export function formatCoordinates(coords) {
  if (!coords) return "N/A";
  if (Array.isArray(coords)) {
    return coords.join(", ");
  }
  if (typeof coords === "string") {
    return coords;
  }
  return "N/A";
}

/**
 * Format phone number (basic)
 */
export function formatPhoneNumber(phone) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }
  return phone;
}

/**
 * Format distance in km
 */
export function formatDistance(distanceKm) {
  if (distanceKm == null) return "Unknown";
  return `${distanceKm} km`;
}
