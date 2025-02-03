// @import dependencies
import axios from "axios";
// @import baseurl
import getBaseUrl from "./baseUrl";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    if (
      response?.data?.responseCode === 401 ||
      response?.data?.responseCode === 403
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("persist:root");
      toast.info("Logged out successfully.");
    }
    return response;
  },
  (error) => {
    if (error?.response && error?.response?.responseCode === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("persist:root");
      toast.info("Logged out successfully.");
      return Promise.reject(error);
    }

    return Promise.resolve(error?.response);
  }
);

export default api;
