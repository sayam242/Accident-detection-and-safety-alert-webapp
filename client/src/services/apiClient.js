import axios from "axios";

const baseURL = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "");

const apiClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Attach token from localStorage to every request if present
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // ignore localStorage read errors in non-browser environments
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response handler: emit event on 401 so app can react (logout/redirect)
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        localStorage.removeItem("token");
      } catch (e) {
        // ignore
      }
      // signal app to handle unauthorized centrally
      if (typeof window !== "undefined" && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent("api:unauthorized", { detail: error }));
      }
    }
    return Promise.reject(error);
  }
);

export function setAuthToken(token) {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
}

export function get(path, config) {
  return apiClient.get(path, config);
}

export function post(path, data, config) {
  return apiClient.post(path, data, config);
}

export function put(path, data, config) {
  return apiClient.put(path, data, config);
}

export function del(path, config) {
  return apiClient.delete(path, config);
}

export default apiClient;
