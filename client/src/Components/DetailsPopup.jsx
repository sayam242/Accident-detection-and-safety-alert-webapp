import React from "react";
import MapPopup from "./MapPopup";

export default function DetailsPopup({ open, onClose, accident }) {
  if (!open || !accident) return null;
  console.log("Location arrqay is: ",accident.location.coordinates)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      

      <div className="bg-white rounded-3xl border border-gray-300 shadow-lg w-full max-w-2xl p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-1 right-3 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
      
        <div className="w-full h-50 rounded-2xl flex items-center justify-center mt-2 mb-6 relative">
          {accident.location.coordinates && <MapPopup coords={accident.location.coordinates} />}
          
          <span className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow">
            
            <span className="text-gray-500"></span>
          </span>
        </div>
        {/* Details Grid */}
        <div className="grid grid-cols-4 gap-y-4 gap-x-2 text-center mb-6">
          <div>
            <div className="font-bold">Location</div>
            <div>{accident.location.coordinates}</div>
          </div>
          <div>
            <div className="font-bold">Time</div>
            <div>{accident.time}</div>
          </div>
          <div>
            <div className="font-bold">Severity</div>
            <div className="text-red-500">{accident.severity}</div>
          </div>
          <div>
            <div className="font-bold">Distance</div>
            <div>{accident.distance}</div>
          </div>
          <div>
            <div className="font-bold">Blood Presence</div>
            <div>{accident.bloodPresence || "Yes"}</div>
          </div>
          <div>
            <div className="font-bold">Type</div>
            <div>{accident.type || "Collision"}</div>
          </div>
          <div>
            <div className="font-bold">Vehicle</div>
            <div>{accident.vehicle || "Hyundai i20"}</div>
          </div>
          <div>
            <div className="font-bold">Number</div>
            <div>{accident.number || "PB 65 XY 9087"}</div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          <button className="border border-blue-500 text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50">
            Generate Report
          </button>
          <button className="border border-red-500 text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-red-50">
            Allot Ambulance
          </button>
          <button className="border border-green-500 text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-50">
            Mark as Resolved
          </button>
        </div>
      </div>
    </div>
  );
}