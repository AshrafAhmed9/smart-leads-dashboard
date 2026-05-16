import api from './axios';
import { ApiResponse, User } from '../types';

interface AuthPayload { token: string; user: User; }

export const registerApi = (body: { name: string; email: string; password: string }) =>
  api.post<ApiResponse<AuthPayload>>('/auth/register', body).then(r => r.data);

export const loginApi = (body: { email: string; password: string }) =>
  api.post<ApiResponse<AuthPayload>>('/auth/login', body).then(r => r.data);

export const getMeApi = () =>
  api.get<ApiResponse<User>>('/auth/me').then(r => r.data);
