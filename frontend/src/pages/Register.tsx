
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { authService } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 7) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthColors = ['bg-slate-200', 'bg-danger-500', 'bg-warning-500', 'bg-primary-500', 'bg-success-500'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    try {
      await authService.register({ full_name: name, email, password });
      
      // Auto-login after successful registration
      const response = await authService.login({ email, password });
      const token = (response as any).access_token || (response as any).token;
      
      if (token) {
        localStorage.setItem('token', token);
        const initialize = useAuthStore.getState().initialize;
        await initialize();
        toast.success('Account created successfully!');
        navigate('/dashboard');
      } else {
        toast.success('Account created! Please log in.');
        navigate('/login');
      }
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.status === 409 
        ? 'Email already registered.' 
        : 'Failed to create account. Please try again.';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Create Account</h2>
      <p className="text-slate-500 text-center mb-8">Join thousands of students traveling smarter.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Full Name" 
          type="text" 
          placeholder="Alex Johnson"
          icon={<User className="h-4 w-4" />}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input 
          label="Email Address" 
          type="email" 
          placeholder="alex@example.com"
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
          {password.length > 0 && (
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div 
                  key={level} 
                  className={`h-1 flex-1 rounded-full ${strength >= level ? strengthColors[strength] : 'bg-slate-200 dark:bg-slate-700'}`}
                />
              ))}
            </div>
          )}
        </div>
        <Input 
          label="Confirm Password" 
          type="password" 
          placeholder="••••••••"
          icon={<ShieldCheck className="h-4 w-4" />}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        
        <div className="flex items-start mt-4 mb-6">
          <input type="checkbox" id="terms" className="mt-1 mr-2 cursor-pointer rounded border-slate-300 text-primary-600 focus:ring-primary-500" required />
          <label htmlFor="terms" className="text-sm text-slate-500">
            I agree to the <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>.
          </label>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Free Account'}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm text-slate-500">
        Already have an account? <Link to="/login" className="text-primary-600 font-medium hover:underline">Sign in</Link>
      </div>
    </div>
  );
}
