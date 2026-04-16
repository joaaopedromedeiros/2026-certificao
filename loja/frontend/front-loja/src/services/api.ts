import axios from "axios";

const api = axios.create({
  baseURL: "https://two026-certificao-3.onrender.com/api",
});

// Isso faz com que todas as requisições enviem automaticamente o token de autenticação, 
// sem você precisar adicionar manualmente em cada chamada.

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;