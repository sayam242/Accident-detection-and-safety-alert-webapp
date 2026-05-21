import React from "react";
import DetailsPopup from "./map/DetailsPopup";

const severityColors = {
  Critical: "bg-red-100 text-red-600 border-red-300",
  Moderate: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Low: "bg-green-100 text-green-700 border-green-300",
};

export default function ReportedTable({ reports = [], onViewResponses }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-3 px-6 text-center font-semibold">Location</th>
            <th className="py-3 px-6 text-center font-semibold">Image</th>
            <th className="py-3 px-6 text-center font-semibold">Time</th>
            <th className="py-3 px-6 text-center font-semibold">Severity</th>
            <th className="py-3 px-6 text-center font-semibold">Distance</th>
            <th className="py-3 px-6 font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {reports.map((accident, index) => (
            <tr key={accident._id || index} className={`h-16 ${index % 2 === 1 ? "bg-gray-50" : ""}`}>
              <td className="py-3 px-6 text-center">{accident.location?.coordinates?.join(", ") || "N/A"}</td>
              <td className="py-3 px-6 text-center">
                <img src={accident.image} alt="Accident" className="w-16 h-10 object-cover rounded-lg inline-block align-middle" />
              </td>
              <td className="py-3 px-6 text-center">{accident.timeDetected ? new Date(accident.timeDetected).toLocaleString() : "—"}</td>
              <td className="py-3 px-6 text-center">
                <span className={`inline-block min-w-[6rem] text-center px-3 py-1 rounded-full border text-xs font-semibold ${severityColors[accident.severity] || severityColors.Moderate}`}>
                  {accident.severity}
                </span>
              </td>
              <td className="py-3 px-6 text-center">{accident.distanceKm != null ? `${accident.distanceKm} km` : "Unknown"}</td>
              <td className="py-3 px-6 text-center">
                <button onClick={() => onViewResponses(accident)} className="px-3 py-1 rounded-full border border-blue-300 text-blue-700 bg-blue-50 text-xs font-semibold hover:bg-blue-100 transition">View Responses</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
