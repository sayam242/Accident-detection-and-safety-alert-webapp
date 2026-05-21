import { useState, useEffect } from "react";
import { AMBULANCE_FORM_DEFAULTS } from "../../../constants/formDefaults";
import { AMBULANCE_ENDPOINTS } from "../../../constants/apiConstants";
import * as ambulanceService from "../../../services/ambulanceService";

export function useAmbulances() {
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(AMBULANCE_FORM_DEFAULTS);




  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const submit = async (onAdded, onClose) => {
    setLoading(true);
    const res = await ambulanceService.addAmbulance(form);
    if(res.success) {
      onAdded();
      onClose();
    }
    else{
      alert("Failed to add ambulance");
    }
    setLoading(false);
  };

  const fetchAll = async () => {
    setLoading(true);
    const res = await ambulanceService.fetchAmbulances();
    if (res.success) {
      setAmbulances(res.data || []);
      setError("");
    } else {
      setError(res.message || "Failed to load ambulances");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const toggleStatus = async (id, status) => {
    const res = await ambulanceService.updateAmbulanceStatus(id, status);
    if (res.success) await fetchAll();
    return res;
  };

  const add = async (payload) => {
    const res = await ambulanceService.addAmbulance(payload);
    if (res.success) await fetchAll();
    return res;
  };

  const remove = async (id) => {
    const res = await ambulanceService.deleteAmbulance(id);
    if (res.success) await fetchAll();
    return res;
  };

  return {
    ambulances,
    loading,
    error,
    form,
    setForm,
    fetchAll,
    toggleStatus,
    add,
    remove,
    submit,
    handleChange
  };
}

export default useAmbulances;
