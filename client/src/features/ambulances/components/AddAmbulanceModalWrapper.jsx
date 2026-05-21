import React from "react";
import AddAmbulanceModal from "./AddAmbulanceModal";

export default function AddAmbulanceModalWrapper({ onClose, onAdded }) {
  // Reuse existing modal component; forward onAdded to parent
  return <AddAmbulanceModal onClose={onClose} onAdded={onAdded} />;
}
