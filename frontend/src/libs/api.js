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
      toast.info("Logged out successfully.");
    }
    return response;
  },
  (error) => {
    if (error?.response && error?.response?.responseCode === 401) {
      return Promise.reject(error);
    }

    return Promise.resolve(error?.response);
  }
);

export default api;
