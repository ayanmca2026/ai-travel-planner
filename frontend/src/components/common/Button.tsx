import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-[#6366F1] text-white hover:bg-[#818CF8] focus:ring-primary-500',
      secondary: 'bg-transparent border border-slate-300 text-[#334155] dark:border-[#334155] dark:text-[#CBD5E1] hover:bg-slate-50 dark:hover:bg-slate-800 focus:ring-slate-500',
      outline: 'border-2 border-slate-300 text-[#334155] bg-transparent hover:bg-slate-50 focus:ring-slate-500 dark:border-border dark:text-text-primary dark:hover:bg-slate-800',
      ghost: 'bg-transparent text-[#334155] hover:bg-slate-100 focus:ring-slate-500 dark:text-text-primary dark:hover:bg-slate-800',
      danger: 'bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-500',
      accent: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-4 text-base',
      lg: 'h-14 px-6 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
