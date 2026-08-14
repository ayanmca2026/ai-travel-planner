import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-200">
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50">
        <div className="font-bold text-xl text-primary-600 flex items-center gap-2">
          <span className="text-2xl">✈️</span> TripWise AI
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="/features" className="hover:text-primary-600 transition-colors">Features</a>
          <a href="/how-it-works" className="hover:text-primary-600 transition-colors">How it Works</a>
        </nav>
        <div className="flex gap-4">
          <a href="/login" className="text-sm font-medium hover:text-primary-600 self-center">Log in</a>
          <a href="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">Sign up</a>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-6 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} TripWise AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
