import React, { useState } from "react";
import { useAmbulances } from "../hooks/useAmbulances";
import AmbulanceList from "../components/AmbulanceList";
import AddAmbulanceModalWrapper from "../components/AddAmbulanceModalWrapper";
import { AMBULANCE_TEXT } from "../constants/ambulanceConstants";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ManageAmbulancesPage() {
  const { ambulances, loading, error, fetchAll, toggleStatus } = useAmbulances();
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();

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
          <h2 className="text-2xl font-bold">{AMBULANCE_TEXT.TITLE}</h2>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {AMBULANCE_TEXT.ADD_CTA}
        </button>
      </div>

      {error ? <p className="text-red-600">{error}</p> : null}

      <AmbulanceList ambulances={ambulances} onToggleStatus={toggleStatus} />

      {showAdd && (
        <AddAmbulanceModalWrapper
          onClose={() => setShowAdd(false)}
          onAdded={fetchAll}
        />
      )}
    </div>
  );
}
