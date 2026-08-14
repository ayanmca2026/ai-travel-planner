import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">{label}</label>}
        <select
          ref={ref}
          className={cn(
            "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 appearance-none",
            error && "border-danger-500 focus:ring-danger-500",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-danger-500">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
