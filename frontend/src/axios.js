// src/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://internconnect-shq7.onrender.com/api",
  withCredentials: true
});

export default api;
