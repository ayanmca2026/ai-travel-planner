import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div>
      <Link to="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to login
      </Link>
      
      {!isSubmitted ? (
        <>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Reset Password</h2>
          <p className="text-slate-500 mb-8">Enter your email address and we'll send you a link to reset your password.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="you@example.com"
              icon={<Mail className="h-4 w-4" />}
              required
            />
            <Button type="submit" className="w-full">Send Reset Link</Button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <div className="w-16 h-16 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Check your email</h2>
          <p className="text-slate-500 mb-8">
            We've sent a password reset link to your email address. Click the link to set a new password.
          </p>
          <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
            Didn't receive the email? Try again
          </Button>
        </div>
      )}
    </div>
  );
}
