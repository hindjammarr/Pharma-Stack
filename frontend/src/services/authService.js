// frontend/src/services/authService.js
import axios from "axios";

const API_URL = "/api/auth";

const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

const authService = {
  signup,
  login,
};

export default authService;