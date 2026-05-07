import axios from "axios";

const API = axios.create({
  baseURL: "https://localmart-m1fl.onrender.com",
});

export const getProducts = (params) => API.get("/products", { params });
export const getProductById = (id) => API.get(`/products/${id}`);
export const placeOrder = (orderData) => API.post("/orders", orderData);
export const getOrderById = (id) => API.get(`/orders/${id}`);