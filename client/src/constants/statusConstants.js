/**
 * Application Status Constants
 */

// Ambulance statuses
export const AMBULANCE_STATUS = {
  AVAILABLE: "available",
  DISABLED: "disabled",
  IN_TRANSIT: "in-transit",
  ON_SCENE: "on-scene",
};

// Ambulance status styling (Tailwind classes)
export const AMBULANCE_STATUS_COLORS = {
  [AMBULANCE_STATUS.AVAILABLE]: "bg-green-100 text-green-700",
  [AMBULANCE_STATUS.DISABLED]: "bg-gray-100 text-gray-700",
  [AMBULANCE_STATUS.IN_TRANSIT]: "bg-blue-100 text-blue-700",
  [AMBULANCE_STATUS.ON_SCENE]: "bg-purple-100 text-purple-700",
};

// Report statuses
export const REPORT_STATUS = {
  REPORTED: "reported",
  RESPONDED: "responded",
  IN_PROGRESS: "in-progress",
  FINALIZED: "finalized",
  CANCELLED: "cancelled",
};

// Report source types
export const REPORT_SOURCE = {
  DEVICE: "device",
  MANUAL: "manual",
  HOTLINE: "hotline",
};

// Report source styling
export const REPORT_SOURCE_COLORS = {
  [REPORT_SOURCE.DEVICE]: "bg-purple-100 text-purple-700 border-purple-300",
  [REPORT_SOURCE.MANUAL]: "bg-blue-100 text-blue-700 border-blue-300",
  [REPORT_SOURCE.HOTLINE]: "bg-green-100 text-green-700 border-green-300",
};

/**
 * Get ambulance status styling
 * @param {string} status - ambulance status
 * @returns {string} Tailwind classes
 */
export function getAmbulanceStatusColor(status) {
  return AMBULANCE_STATUS_COLORS[status] || AMBULANCE_STATUS_COLORS[AMBULANCE_STATUS.DISABLED];
}

/**
 * Check if ambulance is available
 * @param {string} status - ambulance status
 * @returns {boolean}
 */
export function isAmbulanceAvailable(status) {
  return status === AMBULANCE_STATUS.AVAILABLE;
}

/**
 * Get report source styling
 * @param {string} source - report source
 * @returns {string} Tailwind classes
 */
export function getReportSourceColor(source) {
  return REPORT_SOURCE_COLORS[source] || REPORT_SOURCE_COLORS[REPORT_SOURCE.MANUAL];
}
