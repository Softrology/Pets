// apiService.js
import axios from "axios";
import baseUrl from "./baseUrl";
import AlertDialog from "../utitlities/Alert";

const axiosInstance = axios.create({
  baseURL: baseUrl, // Set your base URL here if it's common across all endpoints
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic API service function
export const apiService = async (url, method, body = null, token = null) => {
  let attempt = 0;
  const maxRetries = 1; // Only allow 1 retry

  while (attempt <= maxRetries) {
    try {
      const config = {
        method,
        url,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      };

      if (body instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
        config.data = body;
      } else if (body) {
        config.headers["Content-Type"] = "application/json";
        config.data = body;
      }

      const response = await axiosInstance(config);
      return response.data;
    } catch (error) {
      if (attempt < maxRetries) {
        attempt++;
        continue; // Retry the request once
      } else {
        // Handle errors - PRESERVE the original error response
        if (error.response) {
          // Show the alert dialog
          AlertDialog(
            "",
            error.response.data.message || error.response.statusText,
            "error",
            1500
          );

          // IMPORTANT: Throw the original error to preserve response data
          throw error;
        } else if (error.request) {
          AlertDialog(
            "",
            "No response received from the server",
            "error",
            1500
          );
          throw new Error("No response received from the server");
        } else {
          AlertDialog(
            "",
            error.message || "Something went wrong",
            "error",
            1500
          );
          throw new Error(error.message || "Something went wrong");
        }
      }
    }
  }
};

export const get = (url, token) => apiService(url, "GET", null, token);
export const post = (url, body, token) => apiService(url, "POST", body, token);
export const put = (url, body, token) => apiService(url, "PUT", body, token);
export const patch = (url, body, token) =>
  apiService(url, "PATCH", body, token);
export const del = (url, token) => apiService(url, "DELETE", null, token);
