import axios from "axios";

// Axios instance
const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
export default adminApi;
