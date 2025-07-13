import React from "react";
import location_icon from "../assets/dashboard/Location.png"
import Navbar from "../Components/Navbar";
import { useState } from "react";
import DetailsPopup from "../Components/DetailsPopup";

const accidentData = [
  {
    location: "PGIMER Roundabout",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=64&h=40",
    time: "14:32",
    severity: "Critical",
    distance: "0.2 km",
    status: "Responded",
  },
 
];

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

export default function Home() {
const [selectedAccident, setSelectedAccident] = useState(null);
const [modalOpen, setModalOpen] = useState(false);

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
                  <td className="py-2 px-6"><div className="flex items-center h-full">{accident.location}</div></td>
                  <td className="py-2 px-6">
                    <div className="flex items-center h-full"><img
                      src={accident.image}
                      alt={accident.location}
                      className="w-16 h-8 object-cover rounded-lg"
                    /></div>
                  </td>
                  <td className="py-2 px-6" >
                    <div className="px-3 items-center h-full">{accident.time}</div></td>
                  <td className="py-2 px-6">
                    <div className="px-2flex items-center h-full"><span
                      className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${severityColors[accident.severity]}`}
                    >
                      {accident.severity}
                    </span>
                    </div>
                  </td>
                  <td className="py-2 px-6"><div className="px-2flex items-center h-full">{accident.distance}</div></td>
                  <td className="py-2 px-6">
                    <div className=" px-2flex items-center h-full"><span
                      className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[accident.status]}`}
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
    </div>
    
    </>
  );
}
