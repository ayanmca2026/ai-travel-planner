import { BudgetHealth } from '@/types/budget';
import { cn } from '@/utils/cn';

interface BudgetHealthBarProps {
  percentage: number;
  health: BudgetHealth;
}

export function BudgetHealthBar({ percentage, health }: BudgetHealthBarProps) {
  const getHealthColor = () => {
    switch(health) {
      case BudgetHealth.HEALTHY: return 'bg-success-500';
      case BudgetHealth.WARNING: return 'bg-warning-500';
      case BudgetHealth.DANGER: return 'bg-danger-500';
      default: return 'bg-primary-500';
    }
  };

  const getHealthMessage = () => {
    switch(health) {
      case BudgetHealth.HEALTHY: return 'Looking great! You are well within budget.';
      case BudgetHealth.WARNING: return 'Getting close to your budget limit.';
      case BudgetHealth.DANGER: return 'Warning: You are projected to exceed your budget!';
      default: return '';
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Budget Usage</span>
        <span className="text-sm font-bold text-slate-900 dark:text-white">{percentage.toFixed(1)}%</span>
      </div>
      <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-1000 ease-out", getHealthColor())}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <p className={cn("text-xs mt-2", 
        health === BudgetHealth.DANGER ? 'text-danger-500 font-medium' : 'text-slate-500'
      )}>
        {getHealthMessage()}
      </p>
    </div>
  );
}
