import api from './client';
import { User, AuthResponse } from '@/types/auth';

export const authService = {
  login: async (credentials: any): Promise<AuthResponse> => {
    // OAuth2PasswordRequestForm expects x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);
    
    const { data } = await api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return data;
  },
  
  register: async (userData: any): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },
  
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // Ignore errors on logout
    }
  },
  
  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get('/users/me');
    return data;
  },
  
  refreshToken: async (): Promise<string> => {
    const { data } = await api.post('/auth/refresh');
    return data.token;
  }
};
