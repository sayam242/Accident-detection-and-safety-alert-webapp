import { useState, useEffect } from "react";
import { getToken, getHospitalId, getHospitalLocation, isAuthenticated } from "../services/authService";

/**
 * Hook to manage authentication session state
 * Syncs with localStorage and provides auth helpers
 * @returns {object} - { token, hospitalId, hospitalLocation, isAuth, loading }
 */
export function useAuthSession() {
  const [token, setToken] = useState(null);
  const [hospitalId, setHospitalId] = useState(null);
  const [hospitalLocation, setHospitalLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    try {
      setToken(getToken());
      setHospitalId(getHospitalId());
      setHospitalLocation(getHospitalLocation());
    } catch (e) {
      console.error("Error loading auth session:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Listen for unauthorized events (from apiClient interceptor)
  useEffect(() => {
    const handleUnauthorized = () => {
      setToken(null);
      setHospitalId(null);
      setHospitalLocation(null);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("api:unauthorized", handleUnauthorized);
      return () => window.removeEventListener("api:unauthorized", handleUnauthorized);
    }
  }, []);

  return {
    token,
    hospitalId,
    hospitalLocation,
    isAuth: !!token,
    isAuthenticated,
    loading,
  };
}
