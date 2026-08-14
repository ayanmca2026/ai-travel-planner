import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Compass, Bookmark, PieChart, Sparkles, User, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
  const location = useLocation();
  const logout = useAuthStore(state => state.logout);

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Sparkles className="w-5 h-5 text-accent-500" />, label: 'Plan Trip', path: '/trips/new' },
    { icon: <Map className="w-5 h-5" />, label: 'My Trips', path: '/trips' },
    { icon: <Compass className="w-5 h-5" />, label: 'Explore', path: '/explore' },
    { icon: <Bookmark className="w-5 h-5" />, label: 'Saved Places', path: '/saved' },
    { icon: <PieChart className="w-5 h-5" />, label: 'Budget', path: '/budget' },
    { icon: <Sparkles className="w-5 h-5 text-primary-500" />, label: 'AI Assistant', path: '/ai-assistant' },
  ];

  const bottomItems = [
    { icon: <User className="w-5 h-5" />, label: 'Profile', path: '/profile' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
  ];

  // Close sidebar on mobile when route changes
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 w-64 p-4 transition-all duration-300">
      <div className="flex items-center justify-between mb-8 px-2">
        <Link to="/dashboard" className="font-bold text-xl text-primary-600 flex items-center gap-2">
          <span className="text-2xl">✈️</span> TripWise
        </Link>
        <button className="md:hidden text-slate-500" onClick={() => setIsOpen(false)}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1 pt-4 border-t border-slate-200 dark:border-slate-800">
        {bottomItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-danger-600 dark:text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:block h-screen sticky top-0">
        <SidebarContent />
      </div>
      
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative z-10 h-full shadow-xl">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
