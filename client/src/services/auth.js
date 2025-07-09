import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const register = (userData) => authApi.post('/auth/register', userData);
export const login = (credentials) => authApi.post('/auth/login', credentials);
export const getCurrentUser = () => authApi.get('/auth/me');
export const logoutUser = () => authApi.post('/auth/logout');

export const setAuthToken = (token) => {
  if (token) {
    authApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete authApi.defaults.headers.common['Authorization'];
  }
};