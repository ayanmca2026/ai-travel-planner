
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    login({ id: '1', email: 'student@example.com', name: 'Student' }, 'fake-token');
    toast.success('Welcome back!');
    navigate('/dashboard');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Welcome back</h2>
      <p className="text-slate-500 text-center mb-8">Enter your details to access your trips.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Email Address" 
          type="email" 
          placeholder="you@example.com"
          icon={<Mail className="h-4 w-4" />}
          required
        />
        <div>
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            icon={<Lock className="h-4 w-4" />}
            required
          />
          <div className="flex justify-end mt-1">
            <Link to="/forgot-password" className="text-xs text-primary-600 hover:underline">Forgot password?</Link>
          </div>
        </div>
        
        <Button type="submit" className="w-full mt-6">Sign In</Button>
      </form>
      
      <div className="mt-8 text-center text-sm text-slate-500">
        Don't have an account? <Link to="/register" className="text-primary-600 font-medium hover:underline">Sign up</Link>
      </div>
    </div>
  );
}
