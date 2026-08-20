
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { authService } from '@/api/auth.api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      // Depending on API, response might be the token or object containing token
      const token = (response as any).access_token || (response as any).token;
      if (!token) throw new Error("No token received");
      
      // We don't get the user from login (it's OAuth2), we just get the token.
      // So we store the token and call initialize to fetch the user.
      localStorage.setItem('token', token);
      const initialize = useAuthStore.getState().initialize;
      await initialize();
      
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Login failed:", error);
      const serverMsg = error.response?.data?.error || error.response?.data?.detail;
      
      let msg = 'Failed to login. Please try again.';
      if (serverMsg) {
        msg = typeof serverMsg === 'string' ? serverMsg : JSON.stringify(serverMsg);
      } else if (error.response?.status === 401) {
        msg = 'Invalid email or password.';
      } else if (error.response?.status === 422) {
        msg = 'Please check the submitted fields.';
      } else if (error.response?.status === 500) {
        msg = 'Database error occurred';
      } else if (error.response?.status === 502 || error.response?.status === 503) {
        msg = 'Server/database error. Please try again.';
      } else if (!error.response) {
        msg = 'Unable to connect to TripWise API.';
      }
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            icon={<Lock className="h-4 w-4" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-end mt-1">
            <Link to="/forgot-password" className="text-xs text-primary-600 hover:underline">Forgot password?</Link>
          </div>
        </div>
        
        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      
      <div className="mt-8 text-center text-sm text-slate-500">
        Don't have an account? <Link to="/register" className="text-primary-600 font-medium hover:underline">Sign up</Link>
      </div>
    </div>
  );
}
