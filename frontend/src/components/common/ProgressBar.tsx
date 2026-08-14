import { cn } from '@/utils/cn';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function ProgressBar({ progress, label, showPercentage, color = 'primary', className }: ProgressBarProps) {
  const colors = {
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
          {showPercentage && <span className="text-sm font-medium text-slate-500">{Math.round(clampedProgress)}%</span>}
        </div>
      )}
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-500 ease-out", colors[color])}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
