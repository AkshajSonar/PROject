import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", // change to your backend base URL
  withCredentials: true, // allows sending cookies (for JWT)
});

export default api;
