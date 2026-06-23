import axios from 'axios';
import { BASE_URL } from '../config.js';

const API_URL = import.meta.env.VITE_API_URL || `${BASE_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': '*/*',
  },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('thyrax_user');
    if (user) {
      const { token } = JSON.parse(user);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    // Debug logging for developers
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.headers);

    // Default content type for methods with body
    if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
      if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
      }
    } else {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (optional: redirect to login)
    if (error.response && error.response.status === 401) {
      // You might want to clear local storage and redirect here
      // localStorage.removeItem('thyrax_user');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
