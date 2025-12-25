import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AddAmbulanceModal from "../Components/AddAmbulanceModal.jsx";


export default function ManageAmbulances() {
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");
  const navigate = useNavigate();
  const fetchAmbulances = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/ambulances`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAmbulances(res.data.ambulances);
    } catch (err) {
      alert("Failed to load ambulances");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmbulances();
  }, []);

  const toggleStatus = async (id, status) => {
    await axios.patch(
      `${baseURL}/api/ambulances/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchAmbulances();
  };

  if (loading) return <p>Loading ambulances...</p>;

  return (
    <div className="p-6">
        <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
            <button
            onClick={() => navigate("/reported")}
            className="p-2 rounded-full hover:bg-gray-100"
            title="Back to Dashboard"
            >
            <ArrowLeft size={20} />
            </button>
            <h2 className="text-2xl font-bold">Manage Ambulances</h2>
        </div>

        <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 bg-green-600 text-white rounded"
        >
            + Add Ambulance
        </button>
        </div>


      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ambulances.map((amb) => (
            <tr key={amb._id} className="text-center border-t">
              <td>{amb.vehicleNumber}</td>
              <td>{amb.driverName || "-"}</td>
              <td>{amb.driverContact || "-"}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    amb.status === "available"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {amb.status}
                </span>
              </td>
              <td>
                <button
                  onClick={() =>
                    toggleStatus(
                      amb._id,
                      amb.status === "available" ? "disabled" : "available"
                    )
                  }
                  className="text-blue-600 text-sm"
                >
                  Toggle Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAdd && (
        <AddAmbulanceModal
          onClose={() => setShowAdd(false)}
          onAdded={fetchAmbulances}
        />
      )}
    </div>
  );
}
