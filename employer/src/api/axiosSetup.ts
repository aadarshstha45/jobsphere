import TokenService from "@/services/service-token";
import axios from "axios";
const THREE_MINUTES = 3 * 60 * 1000;
// export const baseURL = "http://localhost:4001/api";
// export const BaseURL = "http://localhost:4001";
export const BaseURL = import.meta.env.VITE_STORAGE_URL;
export const baseURL = import.meta.env.VITE_BASE_URL;
// const getAuthToken = () => {
//   const token = sessionStorage.getItem("access_token");
//   return token ? `Bearer ${token}` : "";
// };

// export const isAuthenticated = sessionStorage.getItem("access_token")
//   ? true
//   : false;

// Custom hook to get the auth token

/**
 * Axios HTTP Client
 * {@link https://github.com/axios/axios#request-config Axios Request Config}
 */
const HttpClient = axios.create({
  baseURL,
  timeout: THREE_MINUTES,
});

// Add a request interceptor to include the authorization header

/**
 * Pass Integito API Key in Header
 */

HttpClient.interceptors.request.use(async (config) => {
  const token = TokenService.getToken()?.token;
  if (config && config.headers) {
    if (token && config.headers["Authorization"] !== "") {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (config.headers["Authorization"] === "") {
      delete config.headers["Authorization"];
    }
  }
  return config;
});

export { HttpClient };
