
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const authAPI = {
  login: (credentials) => axios.post(`${API_BASE_URL}/auth/login`, credentials),
  signup: (userData) => axios.post(`${API_BASE_URL}/auth/signup`, userData),
  getProfile: () => axios.get(`${API_BASE_URL}/auth/me`)
}

export const productsAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/products`),
  getById: (id) => axios.get(`${API_BASE_URL}/products/${id}`),
  create: (product) => axios.post(`${API_BASE_URL}/products`, product),
  update: (id, product) => axios.put(`${API_BASE_URL}/products/${id}`, product),
  delete: (id) => axios.delete(`${API_BASE_URL}/products/${id}`)
}

export const categoriesAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/categories`),
  create: (category) => axios.post(`${API_BASE_URL}/categories`, category),
  update: (id, category) => axios.put(`${API_BASE_URL}/categories/${id}`, category),
  delete: (id) => axios.delete(`${API_BASE_URL}/categories/${id}`)
}

export const ordersAPI = {
  getMyOrders: () => axios.get(`${API_BASE_URL}/orders/my-orders`),
  getAll: () => axios.get(`${API_BASE_URL}/orders`),
  create: (order) => axios.post(`${API_BASE_URL}/orders`, order),
  updateStatus: (id, status) => axios.put(`${API_BASE_URL}/orders/${id}/status`, { status })
}

export const usersAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/users`),
  updateRole: (id, role) => axios.put(`${API_BASE_URL}/users/${id}/role`, { role })
}

export const pharmacyAPI = {
  getInfo: () => axios.get(`${API_BASE_URL}/pharmacy`),
  updateInfo: (info) => axios.put(`${API_BASE_URL}/pharmacy`, info)
}