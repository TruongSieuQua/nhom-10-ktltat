import axios, { AxiosError } from "axios";
import store from "redux/store";

// export const API_URL = "http://3.27.95.49:3060/";
export const API_URL_WEB = "http://kmasplash.surge.sh/";

export const API_URL = "http://localhost:3060";

const apiService = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

// Add a request interceptor
apiService.interceptors.request.use(
  async (config) => {
    const accessToken = store.getState().auth.token;
    if (accessToken) {
      config.headers.Authorization = accessToken;
      config.timeout = 10000;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
apiService.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default apiService;
