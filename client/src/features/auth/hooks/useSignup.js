import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../services/authService";
import { SIGNUP_FORM_DEFAULTS } from "../../../constants/formDefaults";
import { ROUTES } from "../../../constants/routeConstants";
import {
  getFirstValidationError,
  validateSignupForm,
} from "../../../helpers/validationHelpers";
import { normalizeLocation } from "../../../helpers/formHelpers";

export function useSignup() {
  const [formData, setFormData] = useState(SIGNUP_FORM_DEFAULTS);
  const [locationMode, setLocationMode] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationModeChange = (event) => {
    const selected = event.target.value;
    setLocationMode(selected);
    if (selected === "Select on Map") {
      setShowMap(true);
    }
  };

  const handleLocationSelected = (coords) => {
    const location = normalizeLocation(coords);
    setFormData((prev) => ({ ...prev, location }));
    setShowMap(false);
  };

  const resetForm = () => {
    setFormData(SIGNUP_FORM_DEFAULTS);
    setLocationMode("");
    setShowMap(false);
    setResetKey((prev) => prev + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const validation = validateSignupForm(formData);
    if (!validation.isValid) {
      setError(getFirstValidationError(validation.errors));
      return;
    }

    setLoading(true);
    const res = await signup(formData);
    setLoading(false);

    if (res.success) {
      resetForm();
      navigate(ROUTES.LOGIN);
      return;
    }

    setError(res.message || "Registration failed");
  };

  return {
    formData,
    locationMode,
    showMap,
    loading,
    error,
    resetKey,
    setShowMap,
    handleChange,
    handleSubmit,
    handleLocationModeChange,
    handleLocationSelected,
  };
}
