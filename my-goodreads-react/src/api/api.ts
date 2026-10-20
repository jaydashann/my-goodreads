import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true
});

export const publicInstance = axios.create({
  baseURL: "/api",
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  response => response, // Pass through successful responses
  async error => {
    const originalRequest = error.config;

    // Prevent infinite loop by checking the `_retry` flag and the endpoint
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        await axiosInstance.post("/auth/refresh");

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // window.location.href = "/";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Reject if it's not a 401 or refresh fails
  }
);
