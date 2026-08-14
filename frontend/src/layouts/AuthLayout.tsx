import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center items-center bg-slate-900 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-slate-900 z-0 opacity-80" />
        <div className="relative z-10 max-w-md text-center">
          <div className="mb-8 text-6xl">🌍</div>
          <h1 className="text-4xl font-bold mb-6">Plan your dream student trip in seconds.</h1>
          <p className="text-slate-300 text-lg">AI-powered itineraries, budget optimization, and everything you need for the perfect adventure.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8">
          <div className="text-center mb-8 md:hidden">
            <h1 className="text-2xl font-bold text-primary-600">TripWise AI</h1>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
