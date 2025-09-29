// frontend/src/services/pharmacyService.js
import axios from "axios";

const API_URL = "/api/pharmacy";

const getInfo = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const updateInfo = async (info) => {
  const response = await axios.put(API_URL, info);
  return response.data;
};

const sendContactMessage = async (messageData) => {
  const response = await axios.post(`${API_URL}/contact`, messageData);
  return response.data;
};

const pharmacyService = {
  getInfo,
  updateInfo,
  sendContactMessage,
};

export default pharmacyService;