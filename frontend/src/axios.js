// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://internconnect-shq7.onrender.com/api",
  withCredentials: true
});

export default api;
