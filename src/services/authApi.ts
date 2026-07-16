import { apiClient } from './apiClient';
import type { User } from '../types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
  role: 'candidate' | 'recruiter';
}

export const authApi = {
  login: (payload: LoginPayload) => apiClient.post<{ user: User; token: string }>('/api/auth/login', payload),
  register: (payload: RegisterPayload) =>
    apiClient.post<{ user: User; token: string }>('/api/auth/register', payload),
  logout: () => apiClient.post('/api/auth/logout'),
};
