import { useState } from "react";
import axios from "axios";

export default function AddAmbulanceModal({ onClose, onAdded }) {
  const [form, setForm] = useState({
    vehicleNumber: "",
    driverName: "",
    driverContact: "",
  });

  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");

  const submit = async () => {
    try {
      await axios.post(`${baseURL}/api/ambulances`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onAdded();
      onClose();
    } catch {
      alert("Failed to add ambulance");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="font-bold mb-4">Add Ambulance</h3>

        <input
          placeholder="Vehicle Number"
          className="border w-full mb-2 p-2"
          onChange={(e) =>
            setForm({ ...form, vehicleNumber: e.target.value })
          }
        />

        <input
          placeholder="Driver Name"
          className="border w-full mb-2 p-2"
          onChange={(e) =>
            setForm({ ...form, driverName: e.target.value })
          }
        />

        <input
          placeholder="Driver Contact"
          className="border w-full mb-4 p-2"
          onChange={(e) =>
            setForm({ ...form, driverContact: e.target.value })
          }
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={submit}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
