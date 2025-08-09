import axios from "axios";
import { config } from "../config";

const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // No need to add token since we're using cookies
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - redirect to signin (cookies will be cleared by server)
          window.location.href = "/signin";
          break;
        case 403:
          console.error("Access forbidden:", data.message);
          break;
        case 404:
          console.error("Resource not found:", data.message);
          break;
        case 500:
          console.error("Server error:", data.message);
          break;
        default:
          console.error("API Error:", data.message);
      }
    } else if (error.request) {
      console.error("Network error:", error.message);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
