import axios from 'axios';
import { SERVER_URL } from '../config/constants';

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

// inject JWT before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// handle token expiration & authorization
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
