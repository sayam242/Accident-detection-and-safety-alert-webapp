import React, { useState } from "react";

export default function RespondModal({
  open,
  onClose,
  onSubmit,
  ambulances = [],
}) {
  if (!open) return null;

  const [selectedAmbulance, setSelectedAmbulance] = useState("");
  const [eta, setEta] = useState("");

  const handleSubmit = () => {
    if (!selectedAmbulance || !eta) {
      alert("Please select ambulance and enter ETA");
      return;
    }

    if (Number(eta) <= 0) {
      alert("ETA must be greater than 0");
      return;
    }

    onSubmit({
      ambulanceId: selectedAmbulance,
      estimatedTimeToReach: Number(eta),
    });
  };

  return (
    <div
        className="fixed inset-0 flex items-center justify-center bg-black/60"
        style={{ zIndex: 9999 }}
    >
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Respond to Accident
        </h2>

        {/* Ambulance Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Select Ambulance
          </label>
          <select
            value={selectedAmbulance}
            onChange={(e) => setSelectedAmbulance(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">-- Select --</option>
            {ambulances.map((amb) => (
              <option key={amb._id} value={amb._id}>
                {amb.vehicleNumber} ({amb.driverName})
              </option>
            ))}
          </select>
        </div>

        {/* ETA Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Estimated Time to Reach (minutes)
          </label>
          <input
            type="number"
            min="1"
            value={eta}
            onChange={(e) => setEta(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="e.g. 12"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Submit Response
          </button>
        </div>
      </div>
    </div>
  );
}
