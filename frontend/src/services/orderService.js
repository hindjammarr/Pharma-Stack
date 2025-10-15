// frontend/src/services/orderService.js
import axios from "axios";

const API_URL = "/api/orders";

const getUserOrders = async (token) => {
  const response = await axios.get(`${API_URL}/my-orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


const getAllOrders = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("/api/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const createOrder = async (orderData, token) => {
  const response = await axios.post("/api/orders", orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


const updateOrderStatus = async (orderId, status, token) => {
  const response = await axios.put(
    `${API_URL}/${orderId}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};


const orderService = {
  getUserOrders,
  getAllOrders,
  createOrder,
  updateOrderStatus,
};

export default orderService;