import React from "react";

export default function AmbulanceList({ ambulances = [], onToggleStatus, onDelete }) {
  return (
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
                  onToggleStatus(
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
  );
}
