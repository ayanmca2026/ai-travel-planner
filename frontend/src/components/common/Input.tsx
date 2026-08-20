import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-text-secondary">{label}</label>}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-text-muted">{icon}</div>}
          <input
            ref={ref}
            className={cn(
              "w-full rounded-lg border border-slate-300 dark:border-border bg-white dark:bg-[#0D1428] px-3 py-2 text-sm text-text-primary placeholder:text-slate-500 dark:placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-600/20 dark:focus:ring-primary-500/25 focus:border-primary-600 dark:focus:border-primary-500 disabled:opacity-50",
              icon && "pl-10",
              error && "border-danger-500 focus:ring-danger-500 focus:border-danger-500",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-danger-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
