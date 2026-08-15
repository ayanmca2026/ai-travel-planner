import { create } from 'zustand';
import { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isInitialized: false,
  login: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
  updateUser: (updatedUser) => set((state) => ({ 
    user: state.user ? { ...state.user, ...updatedUser } : null 
  })),
  initialize: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isInitialized: true, isAuthenticated: false });
      return;
    }
    try {
      const { authService } = await import('@/api/auth.api');
      const data = await authService.getCurrentUser();
      const user = (data as any).data || data;
      set({ user, isAuthenticated: true, isInitialized: true });
    } catch (error) {
      console.error('Failed to initialize auth', error);
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false, isInitialized: true });
    }
  }
}));
