// frontend/src/services/orderService.js
import axios from "axios";

const API_URL = "/api/orders";

const getUserOrders = async (token) => {
  const response = await axios.get(`${API_URL}/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const getAllOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const updateOrderStatus = async (orderId, status) => {
  const response = await axios.put(`${API_URL}/${orderId}/status`, { status });
  return response.data;
};

const orderService = {
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};

export default orderService;