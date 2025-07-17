import React from "react";
import location_icon from "../assets/dashboard/Location.png"
import Navbar from "../Components/Navbar";
import { useState,useEffect } from "react";
import DetailsPopup from "../Components/DetailsPopup";
import axios from "axios";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const severityColors = {
  Critical: "bg-red-100 text-red-600 border-red-300",
  Moderate: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Low: "bg-green-100 text-green-700 border-green-300",
};

const statusColors = {
  Responded: "bg-green-100 text-green-700 border-green-300",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Cancelled: "bg-purple-100 text-purple-700 border-purple-300",
};

export default function Reported() {
const [selectedAccident, setSelectedAccident] = useState(null);
const [modalOpen, setModalOpen] = useState(false);
const [imageModalOpen, setImageModalOpen] = useState(false);
const [modalImageSrc, setModalImageSrc] = useState("");
const [accidentData, setAccidentData] = useState([]);


useEffect(() => {
  const hospitalId = localStorage.getItem("hospitalId");

  axios.get("http://localhost:3000/api/reports", {
    params: { hospitalId }
  })

    .then((res) => {
      console.log("API response:", res.data);
      if (res.data?.success) {
        setAccidentData(res.data.reports);
      } else {
        alert("⚠️ " + (res.data.message || "Failed to fetch data"));
      }
    })
    .catch((err) => {
      console.error("Failed to fetch accident data:", err);
      alert("❌ Error fetching data");
    });
}, []);


const handleMoreDetails = (accident) => {
  setSelectedAccident(accident);
  setModalOpen(true);
};

const handleCloseModal = () => {
  setModalOpen(false);
  setSelectedAccident(null);
};

  return (
    <>
    
    
    <Navbar/>
    <DetailsPopup
  open={modalOpen}
  onClose={handleCloseModal}
  accident={selectedAccident}
/>
    <div className="min-h-screen bg-gray-50 p-6">
    

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Accident Reported</h2>
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
            <span className="material-icons text-gray-500"><img className='h-5 w-5'src={location_icon} alt="" /></span>
            <span className="text-gray-700 font-medium">Chandigarh</span>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-6 text-center font-semibold">Location</th>
                <th className="py-2 px-8 text-center font-semibold">Image</th>
                <th className="py-2 px-6 text-center font-semibold">Time</th>
                <th className="py-2 px-6 text-center font-semibold">Severity</th>
                <th className="py-2 px-6 text-center font-semibold">Distance</th>
                <th className="py-2 px-6 text-center font-semibold">Status</th>
                <th className="py-2 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {accidentData.map((accident, index) => (
                <tr
                  key={index}
                  className={`h-16 ${index% 2 === 1 ? "bg-gray-50" : ""}`}
                  
                >
                  <td className="py-2 px-6"><div className="flex items-center h-full">
                  {accident.location?.coordinates?.join(", ") || "N/A"}
                    </div>
                  </td>
                  
                   <td className="py-2 px-4">
                    <button
                      onClick={() => {
                        setModalImageSrc(accident.image);
                        setImageModalOpen(true);
                      }}
                      className="focus:outline-none"
                    >
                      <img
                        src={accident.image}
                        alt={accident.location}
                        className="w-16 h-10 object-cover rounded-lg"
                      />
                    </button>
                  </td>
                  <td className="py-2 px-6">
                    <div className="px-3 items-center h-full">
                      {new Date(accident.timeDetected).toLocaleString()}
                    </div>
                  </td>
                  <td className="py-2 px-6">
                    <div className="px-2 flex items-center h-full"><span
                      className={`inline-block w-24 text-center px-3 py-1 rounded-full border text-xs font-semibold ${severityColors[accident.severity]}`}
                    >
                      {accident.severity}
                    </span>
                    </div>
                  </td>
                  <td className="py-2 px-6"><div className="px-2flex items-center h-full">{accident.distance}</div></td>
                  <td className="py-2 px-6">
                    <div className=" px-2flex items-center h-full"><span
                      className={`inline-block w-24 text-center px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[accident.status]}`}
                    >
                      {accident.status}
                    </span></div>
                  </td>
                  <td className="py-2 px-6 ">
                    <button onClick={() => handleMoreDetails(accident)}  className="px-3 py-1 rounded-full border border-blue-300 text-blue-700 bg-blue-50 text-xs font-semibold hover:bg-blue-100 transition">
                      More Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {imageModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-90">
    <div className="relative bg-white rounded-lg shadow-lg p-4">
      <button
        className="absolute top-2 right-2 text-gray-600 text-2xl font-bold hover:text-red-500"
        onClick={() => setImageModalOpen(false)}
      >
        &times;
      </button>
      <img
        src={modalImageSrc}
        alt="Full"
        className="max-w-[80vw] max-h-[80vh] rounded-lg"
      />
    </div>
  </div>
)}
    </div>
    
    </>
  );
}
