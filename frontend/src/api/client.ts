import axios from 'axios';

let rawApiUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://ai-travel-planner-olui.onrender.com' : 'http://localhost:8000');
rawApiUrl = rawApiUrl.replace(/\/+$/, '');
rawApiUrl = rawApiUrl.replace(/\/api$/, '');
rawApiUrl = rawApiUrl + '/api';

const api = axios.create({
  baseURL: rawApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
