import { cn } from '@/utils/cn';
import { X } from 'lucide-react';

interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function Chip({ label, active, onClick, onRemove, icon, className }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
        active 
          ? "bg-primary-500 border-primary-500 text-white shadow-sm" 
          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700",
        !onClick && !onRemove && "cursor-default",
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{label}</span>
      {onRemove && (
        <div 
          role="button" 
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={cn(
            "p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors",
            active ? "text-white" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          )}
        >
          <X className="w-3.5 h-3.5" />
        </div>
      )}
    </button>
  );
}
