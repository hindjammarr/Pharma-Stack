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

const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData);
  return response.data;
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