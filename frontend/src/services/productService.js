// frontend/src/services/productService.js
import axios from "axios";

const API_URL = "/api/products";

const getAll = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getByCategory = async (categoryId) => {
  const response = await axios.get(`${API_URL}/category/${categoryId}`);
  return response.data;
};

const createProduct = async (formData) => {
  const res = await axios.post("/api/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

const updateProduct = async (id, formData) => {
  const res = await axios.put(`/api/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};


const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const productService = {
  getAll,
  getByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;