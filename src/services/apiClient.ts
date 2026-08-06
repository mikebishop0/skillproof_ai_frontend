import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// Dynamic Single API Gateway URL
const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const userApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const profileApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const storageApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor to dynamically inject Authorization header using idToken
const injectTokenInterceptor = (config: any) => {
  const state = useAuthStore.getState();
  const idToken = (state as any).idToken;
  if (idToken) {
    config.headers.Authorization = `Bearer ${idToken}`;
  }
  return config;
};

userApiClient.interceptors.request.use(injectTokenInterceptor);
profileApiClient.interceptors.request.use(injectTokenInterceptor);
storageApiClient.interceptors.request.use(injectTokenInterceptor);

