// Axios instance + helper to set token header
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api"; // pour Vite, sinon /api proxy

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set token on Authorization header
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// Optional: response interceptor to detect 401 and auto-logout (handled by caller)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // You can add global error handling here
    return Promise.reject(err);
  }
);

export default api;
