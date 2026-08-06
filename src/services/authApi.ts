import { userApiClient } from './apiClient';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
}

export interface ConfirmSignUpPayload {
  email: string;
  code: string;
}

export interface Tokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  message?: string;
  tokens: Tokens;
}

export interface UserDto {
  id: string;
  cognito_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  country: string;
  email_verified: boolean;
  role: 'DEFAULT' | 'CANDIDATE' | 'RECRUITER' | 'ADMIN';
  plan: 'FREE' | 'PREMIUM' | 'ENTERPRISE';
  profile_image?: string;
  account_status?: string;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    userApiClient.post<LoginResponse>('/api/v1/auth/login', payload),
  register: (payload: RegisterPayload) =>
    userApiClient.post<any>('/api/v1/auth/signup', payload),
  confirmSignup: (payload: ConfirmSignUpPayload) =>
    userApiClient.post<any>('/api/v1/auth/confirm-signup', payload),
  resendCode: (email: string) =>
    userApiClient.post<any>('/api/v1/auth/resend-verification-code', { email }),
  getMe: () =>
    userApiClient.get<UserDto>('/api/v1/users/me'),
  logout: () =>
    userApiClient.post<any>('/api/v1/auth/logout'),
};

