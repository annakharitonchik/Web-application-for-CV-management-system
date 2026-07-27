import axios from 'axios';
import { AccessTokenService } from './components/AccessTokenService.ts';

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

const accessTokenService = new AccessTokenService();

axiosApi.interceptors.request.use((config) => {
  const accessToken = accessTokenService.getToken();

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
