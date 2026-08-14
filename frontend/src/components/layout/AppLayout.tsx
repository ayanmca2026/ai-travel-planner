import { Outlet, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import { MobileNav } from './MobileNav';
import { useAuthStore } from '@/store/auth.store';
import { Menu, Bell, Search, Sun, Moon } from 'lucide-react';
import { useUiStore } from '@/store/ui.store';

export default function AppLayout() {
  const { isAuthenticated, user } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useUiStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-200">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 text-sm w-64 border border-transparent focus-within:border-primary-500 focus-within:bg-white dark:focus-within:bg-slate-900">
              <Search className="w-4 h-4 mr-2 text-slate-400" />
              <input type="text" placeholder="Search trips, places..." className="bg-transparent border-none outline-none w-full dark:text-white" />
              <span className="text-xs bg-slate-200 dark:bg-slate-700 px-1.5 rounded ml-2 text-slate-500 dark:text-slate-300">⌘K</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold text-sm border border-primary-200 dark:border-primary-800 cursor-pointer">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      
      <MobileNav />
    </div>
  );
}
