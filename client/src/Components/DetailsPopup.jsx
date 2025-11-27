import React from "react";
import MapPopup from "./MapPopup";

export default function DetailsPopup({ open, onClose, accident, hospiloc, token }) {
  if (!open || !accident) return null;
  console.log(accident);
  console.log("token at starting",token);
  
//   const handleGenerateReport = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       // optional: redirect if you have navigate available in this component
//       // navigate("/login", { replace: true });
//       alert("Please login");
//       return;
//     }

//     const res = await fetch(`http://localhost:3000/api/pdf/report/${accident._id}`, {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (res.status === 401 || res.status === 403) {
//       localStorage.removeItem("token");
//       // navigate("/login", { replace: true });
//       alert("Session expired. Please login again.");
//       return;
//     }

//     if (!res.ok) {
//       const t = await res.text().catch(() => "");
//       console.error("PDF error:", t);
//       alert("Failed to generate PDF");
//       return;
//     }

//     const blob = await res.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     const ts = new Date(accident.timeDetected || accident.createdAt || Date.now())
//       .toISOString()
//       .split("T")[0];
//     a.href = url;
//     a.download = `Accident_Report_${ts}_${accident._id}.pdf`;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     window.URL.revokeObjectURL(url);
//   } catch (e) {
//     console.error(e);
//     alert("Could not generate PDF");
//   }
// };


const alothandler = async () => {
  try {
    const baseURL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");
    const res = await fetch(
      `${baseURL}/api/reports/${accident._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend error:", text);
      alert("Failed to allocate ambulance");
      return;
    }

    const data = await res.json();
    if (data.success) {
      alert("Ambulance allocated and report moved!");
      onClose(); // close popup
    } else {
      alert(data.message || "Unexpected error");
    }
  } catch (err) {
    console.error("Allocation error:", err);
    alert("Error allocating ambulance");
  }
};


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
          {accident.location.coordinates && <MapPopup coords={accident.location.coordinates} hospiloc={hospiloc} />}
          
          <span className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow">
            
            <span className="text-gray-500"></span>
          </span>
        </div>
        {/* Details Grid */}
        <div className="grid grid-cols-4 gap-y-4 gap-x-2 text-center mb-6">
          <div>
            <div className="font-bold">Location</div>
            <div>{accident.location?.coordinates?.join(", ")}</div>
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
            <div>{accident.distanceKm != null ? `${accident.distanceKm} km` : "Unknown"}</div>
          </div>
         
          
        </div>  
         <div className="grid grid-cols-2 gap-y-4 gap-x-40 text-left">
            <p><b>Reported BY: </b>{accident.name}</p>
            <p><b>Contact no: </b>{accident.contact}</p>\
            <p>
              <b>Reported Via: </b>
              {accident.reportedBy === "device" ? "Device" : "Web App"}
            </p>

          </div>
        {/* Action Buttons */}
        <div className="justify-between mt-4">
          {/* <button onClick={handleGenerateReport} className="border border-blue-500 text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50">
            Generate Report
          </button> */}
          <button onClick={alothandler} className="border border-red-500 text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-red-50">
            Allot Ambulance
          </button>
          {/* <button className="border border-green-500 text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-50">
            Mark as Resolved
          </button> */}
        </div>
      </div>
    </div>
  );
}