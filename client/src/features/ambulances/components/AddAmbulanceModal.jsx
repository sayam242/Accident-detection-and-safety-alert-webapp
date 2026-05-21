import { useState } from "react";
import apiClient from "../../../services/apiClient";
import { AMBULANCE_ENDPOINTS } from "../../../constants/apiConstants";
import {useAmbulances} from "../hooks/useAmbulances";

export default function AddAmbulanceModal({ onClose, onAdded }) {
  const { form, submit, handleChange } = useAmbulances();



  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="font-bold mb-4">Add Ambulance</h3>

        <input
          placeholder="Vehicle Number"
          className="border w-full mb-2 p-2"
          onChange={handleChange}
          name="vehicleNumber"
        />

        <input
          placeholder="Driver Name"
          className="border w-full mb-2 p-2"
          onChange={handleChange}
          name="driverName"
        />

        <input
          placeholder="Driver Contact"
          className="border w-full mb-4 p-2"
          onChange={handleChange}
          name="driverContact"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() =>submit(onAdded, onClose)}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
