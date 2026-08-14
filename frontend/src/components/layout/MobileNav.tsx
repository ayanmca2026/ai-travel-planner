import { Link, useLocation } from 'react-router-dom';
import { Home, Map, PlusCircle, Compass, User } from 'lucide-react';
import { cn } from '@/utils/cn';

export function MobileNav() {
  const location = useLocation();

  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: 'Home', path: '/dashboard' },
    { icon: <Compass className="w-6 h-6" />, label: 'Explore', path: '/explore' },
    { icon: <PlusCircle className="w-10 h-10 text-primary-600 drop-shadow-md" />, label: '', path: '/trips/new', isMain: true },
    { icon: <Map className="w-6 h-6" />, label: 'Trips', path: '/trips' },
    { icon: <User className="w-6 h-6" />, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item, index) => {
        const isActive = location.pathname.startsWith(item.path) && item.path !== '/';
        return (
          <Link
            key={index}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              item.isMain ? "-mt-6" : ""
            )}
          >
            <div className={cn(
              "flex flex-col items-center justify-center transition-colors",
              isActive && !item.isMain ? "text-primary-600 dark:text-primary-400" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300",
              item.isMain ? "bg-white dark:bg-slate-900 p-1 rounded-full" : ""
            )}>
              {item.icon}
              {!item.isMain && <span className="text-[10px] mt-1 font-medium">{item.label}</span>}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
