import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('thyrocarex_user');
    if (user) {
      const { token } = JSON.parse(user);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
      // localStorage.removeItem('thyrocarex_user');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
