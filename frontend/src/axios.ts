import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

axiosApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
