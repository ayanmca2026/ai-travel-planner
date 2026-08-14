import { create } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useUiStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system',
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    set({ theme });
    
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
}));
