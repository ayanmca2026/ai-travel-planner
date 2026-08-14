import api from './client';
import { User, AuthResponse } from '@/types/auth';

export const authService = {
  login: async (credentials: any): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },
  
  register: async (userData: any): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },
  
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
  
  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get('/auth/me');
    return data;
  },
  
  refreshToken: async (): Promise<string> => {
    const { data } = await api.post('/auth/refresh');
    return data.token;
  }
};
