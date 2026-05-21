import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";
import { connect, isConnected, joinHospitalRoom } from "../../../services/socketService";
import { LOGIN_FORM_DEFAULTS } from "../../../constants/formDefaults";
import { ROUTES } from "../../../constants/routeConstants";
import {
  getFirstValidationError,
  validateLoginForm,
} from "../../../helpers/validationHelpers";

export function useLogin() {
  const [formData, setFormData] = useState(LOGIN_FORM_DEFAULTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const validation = validateLoginForm(formData);
    if (!validation.isValid) {
      setError(getFirstValidationError(validation.errors));
      return;
    }

    setLoading(true);
    const res = await login(formData.email, formData.password);

    if (res.success) {
      if (!isConnected()) {
        connect();
      }
      if (res.hospital?._id) {
        joinHospitalRoom(res.hospital._id);
      }
      navigate(ROUTES.REPORTED);
      return;
    }

    setError(res.message || "Login failed");
    setLoading(false);
  };

  return {
    formData,
    loading,
    error,
    setError,
    handleChange,
    handleSubmit,
  };
}
