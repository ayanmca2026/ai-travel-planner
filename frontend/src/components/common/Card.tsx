import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseStyles = 'rounded-xl overflow-hidden';
    
    const variants = {
      default: 'bg-white dark:bg-surface border border-slate-200 dark:border-slate-700',
      glass: 'glass-card',
      elevated: 'bg-white dark:bg-surface shadow-lg border border-slate-100 dark:border-slate-800',
      outlined: 'border-2 border-slate-200 dark:border-slate-700 bg-transparent',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
