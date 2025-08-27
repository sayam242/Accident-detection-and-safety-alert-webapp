// src/Pages/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import location_icon from "../assets/dashboard/Location.png";
import Navbar from "../Components/Navbar";
import DetailsPopup from "../Components/DetailsPopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const severityColors = {
  Critical: "bg-red-100 text-red-600 border-red-300",
  Moderate: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Low: "bg-green-100 text-green-700 border-green-300",
};

export default function Reported() {
  const [token, setToken] = useState(localStorage.getItem("token")); // Start with null, not localStorage value
  const [loading, setLoading] = useState(true);
  const [selectedAccident, setSelectedAccident] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [accidentData, setAccidentData] = useState([]);
  const navigate = useNavigate();

  // ✅ Check token on component mount
  useEffect(() => {
   
    console.log("Retrieved token:", token);
    
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    setLoading(false);
  }, []); // Empty dependency array - runs only once on mount
  localStorage.setItem("token", token); // Ensure token is in localStorage

  // ✅ Fetch accident reports when token is available
  useEffect(() => {
    if (!token) return; // Don't fetch if no token

    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const list = res.data?.reports || [];
        setAccidentData(list);
      } catch (err) {
        const status = err?.response?.status;
        console.error("Failed to fetch accident data:", err?.response?.data || err.message);
        
        if (status === 401 || status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("hospitalId");
          localStorage.removeItem("hospitalLocation");
          navigate("/login", { replace: true });
        } else {
          alert("Error fetching data");
        }
      }
    };

    fetchReports();
  }, [token, navigate]); // Runs when token changes

  const handleMoreDetails = (accident) => {
    setSelectedAccident(accident);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAccident(null);
  };

  const hospiloc = localStorage.getItem("hospitalLocation");

  // ✅ Show loading while checking token
  if (loading) {
    return <p className="text-center">Checking login...</p>;
  }

  return (
    <>
      <Navbar />
      <DetailsPopup
        open={modalOpen}
        onClose={handleCloseModal}
        accident={selectedAccident}
        hospiloc={hospiloc}
        token={token}
      />

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Accident Reported</h2>
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
              <img className="h-5 w-5" src={location_icon} alt="location" />
              <span className="text-gray-700 font-medium">Chandigarh</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full w-full table-fixed border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-3 px-6 text-center font-semibold align-middle">Location</th>
                  <th className="py-3 px-6 text-center font-semibold align-middle">Image</th>
                  <th className="py-3 px-6 text-center font-semibold align-middle">Time</th>
                  <th className="py-3 px-6 text-center font-semibold align-middle">Severity</th>
                  <th className="py-3 px-6 text-center font-semibold align-middle">Distance</th>
                  <th className="py-3 px-6 align-middle"></th>
                </tr>
              </thead>
              <tbody>
                {accidentData.map((accident, index) => (
                  <tr
                    key={accident._id || index} // Use unique ID if available
                    className={`h-16 ${index % 2 === 1 ? "bg-gray-50" : ""} align-middle`}
                  >
                    <td className="py-3 px-6 text-center align-middle">
                      {accident.location?.coordinates?.join(", ") || "N/A"}
                    </td>
                    <td className="py-3 px-6 text-center align-middle">
                      <button
                        onClick={() => {
                          setModalImageSrc(accident.image);
                          setImageModalOpen(true);
                        }}
                        className="focus:outline-none inline-flex items-center justify-center"
                      >
                        <img
                          src={accident.image}
                          alt="Accident"
                          className="w-16 h-10 object-cover rounded-lg inline-block align-middle"
                        />
                      </button>
                    </td>
                    <td className="py-3 px-6 text-center align-middle">
                      {new Date(accident.timeDetected || accident.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-6 text-center align-middle">
                      <span
                        className={`inline-block min-w-[6rem] text-center px-3 py-1 rounded-full border text-xs font-semibold align-middle ${
                          severityColors[accident.severity] || severityColors.Moderate
                        }`}
                      >
                        {accident.severity}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center align-middle">
                      {accident.distanceKm != null ? `${accident.distanceKm} km` : "Unknown"}
                    </td>
                    <td className="py-3 px-6 text-center align-middle">
                      <button
                        onClick={() => handleMoreDetails(accident)}
                        className="px-3 py-1 rounded-full border border-blue-300 text-blue-700 bg-blue-50 text-xs font-semibold hover:bg-blue-100 transition"
                      >
                        More Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {imageModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
              <div className="relative bg-white rounded-lg shadow-lg p-4">
                <button
                  className="absolute top-2 right-2 text-gray-600 text-2xl font-bold hover:text-red-500"
                  onClick={() => setImageModalOpen(false)}
                >
                  &times;
                </button>
                <img
                  src={modalImageSrc}
                  alt="Accident Image"
                  className="max-w-[80vw] max-h-[80vh] rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}