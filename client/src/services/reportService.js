import apiClient from "./apiClient";
import { REPORT_ENDPOINTS } from "../constants/apiConstants";

/**
 * Create a new accident report
 * @param {object} accidentDetails - { name, contact, severity, location, image }
 */
export async function createReport(accidentDetails) {
  try {
    const res = await apiClient.post(REPORT_ENDPOINTS.CREATE, accidentDetails);
    if (res.status === 201 || res.status === 200) {
      return { success: true, data: res.data, message: "Report created successfully" };
    }
    return { success: false, message: res.data?.message || "Report creation failed" };
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Server error";
    return { success: false, message };
  }
}

/**
 * Fetch all reported accidents for the hospital
 */
export async function fetchReports() {
  try {
    const res = await apiClient.get(REPORT_ENDPOINTS.GET_ALL);
    if (res.data?.reports) {
      // Sort by newest first
      const sorted = res.data.reports.sort((a, b) => {
        const ta = new Date(a.timeDetected).getTime();
        const tb = new Date(b.timeDetected).getTime();
        return tb - ta;
      });
      return { success: true, data: sorted };
    }
    return { success: false, message: "No reports found" };
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Failed to fetch reports";
    return { success: false, message };
  }
}

/**
 * Fetch all responded reports for the hospital
 */
export async function fetchResponded() {
  try {
    const res = await apiClient.get(REPORT_ENDPOINTS.GET_RESPONDED);
    if (res.data?.success) {
      return { success: true, data: res.data.data || [] };
    }
    return { success: false, message: "No responded reports found" };
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Failed to fetch responded reports";
    return { success: false, message };
  }
}

/**
 * Get details of a single report
 * @param {string} reportId - report ID
 */
export async function getReport(reportId) {
  try {
    const res = await apiClient.get(REPORT_ENDPOINTS.GET_ONE(reportId));
    if (res.data) {
      return { success: true, data: res.data };
    }
    return { success: false, message: "Report not found" };
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Failed to fetch report";
    return { success: false, message };
  }
}

/**
 * Update report status or details
 * @param {string} reportId - report ID
 * @param {object} updates - fields to update
 */
export async function updateReport(reportId, updates) {
  try {
    const res = await apiClient.put(REPORT_ENDPOINTS.UPDATE(reportId), updates);
    if (res.status === 200) {
      return { success: true, data: res.data };
    }
    return { success: false, message: res.data?.message || "Update failed" };
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Server error";
    return { success: false, message };
  }
}
