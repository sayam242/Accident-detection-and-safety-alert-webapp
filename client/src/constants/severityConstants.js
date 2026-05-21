/**
 * Accident Severity Constants and Styling
 */

// Severity levels
export const SEVERITY_LEVELS = {
  LOW: "Low",
  MODERATE: "Moderate",
  CRITICAL: "Critical",
};

// Severity colors and styling for UI (Tailwind classes)
export const SEVERITY_COLORS = {
  [SEVERITY_LEVELS.CRITICAL]: "bg-red-100 text-red-600 border-red-300",
  [SEVERITY_LEVELS.MODERATE]: "bg-yellow-100 text-yellow-700 border-yellow-300",
  [SEVERITY_LEVELS.LOW]: "bg-green-100 text-green-700 border-green-300",
};

// Severity color hex values
export const SEVERITY_HEX = {
  [SEVERITY_LEVELS.CRITICAL]: "#DC2626", // red-600
  [SEVERITY_LEVELS.MODERATE]: "#B45309", // yellow-700
  [SEVERITY_LEVELS.LOW]: "#15803D", // green-700
};

// Severity descriptions
export const SEVERITY_DESCRIPTIONS = {
  [SEVERITY_LEVELS.CRITICAL]: "Severe accident, immediate emergency response needed",
  [SEVERITY_LEVELS.MODERATE]: "Moderate accident, urgent response required",
  [SEVERITY_LEVELS.LOW]: "Minor accident, standard response protocol",
};

/**
 * Get severity styling by level
 * @param {string} severity - severity level
 * @returns {string} Tailwind classes
 */
export function getSeverityColor(severity) {
  return SEVERITY_COLORS[severity] || SEVERITY_COLORS[SEVERITY_LEVELS.MODERATE];
}

/**
 * Get severity hex color
 * @param {string} severity - severity level
 * @returns {string} hex color
 */
export function getSeverityHex(severity) {
  return SEVERITY_HEX[severity] || SEVERITY_HEX[SEVERITY_LEVELS.MODERATE];
}

/**
 * Get severity description
 * @param {string} severity - severity level
 * @returns {string} description
 */
export function getSeverityDescription(severity) {
  return SEVERITY_DESCRIPTIONS[severity] || "";
}
