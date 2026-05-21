import apiClient from "./apiClient";
import { AMBULANCE_ENDPOINTS } from "../constants/apiConstants";

/**
 * Fetch all ambulances for the hospital
 */
export async function fetchAmbulances() {
  try {
    const res = await apiClient.get(AMBULANCE_ENDPOINTS.GET_ALL);
    if (res.data?.ambulances) {
      return { success: true, data: res.data.ambulances };
    }
    return { success: false, message: "No ambulances found" };
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Failed to load ambulances";
    return { success: false, message };
  }
}

/**
 * Toggle ambulance status (available/disabled)
 * @param {string} id - ambulance ID
 * @param {string} status - new status (available or disabled)
 */
export async function updateAmbulanceStatus(id, status) {
  try {
    const res = await apiClient.patch(AMBULANCE_ENDPOINTS.UPDATE_STATUS(id), { status });
    if (res.status === 200 || res.status === 204) {
      return { success: true, message: "Status updated successfully" };
    }
    return { success: false, message: res.data?.message || "Update failed" };
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Server error";
    return { success: false, message };
  }
}

/**
 * Add a new ambulance
 * @param {object} ambulanceData - { vehicleNumber, driverName, driverContact, ... }
 */
export async function addAmbulance(ambulanceData) {
  try {
    const res = await apiClient.post(AMBULANCE_ENDPOINTS.CREATE, ambulanceData);
    if (res.status === 201 || res.status === 200) {
      return { success: true, data: res.data, message: "Ambulance added successfully" };
    }
    return { success: false, message: res.data?.message || "Creation failed" };
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Server error";
    return { success: false, message };
  }
}

/**
 * Delete an ambulance
 * @param {string} id - ambulance ID
 */
export async function deleteAmbulance(id) {
  try {
    const res = await apiClient.delete(AMBULANCE_ENDPOINTS.DELETE(id));
    if (res.status === 200 || res.status === 204) {
      return { success: true, message: "Ambulance deleted successfully" };
    }
    return { success: false, message: res.data?.message || "Deletion failed" };
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Server error";
    return { success: false, message };
  }
}
