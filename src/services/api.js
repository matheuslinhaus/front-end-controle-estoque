import axios from "axios";

const api = axios.create({
  baseURL: "https://controle-estoque-eu4h.onrender.com", // Defina a base da URL aqui
});

export default api;