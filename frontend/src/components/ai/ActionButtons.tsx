import { Button } from '@/components/common/Button';
import { Wallet, Map, Utensils, TreePine, Navigation, RotateCcw } from 'lucide-react';

export function ActionButtons() {
  const actions = [
    { label: 'Make Cheaper', icon: <Wallet className="w-4 h-4 mr-2" />, color: 'hover:text-success-600 hover:border-success-500 hover:bg-success-50' },
    { label: 'Optimize Route', icon: <Map className="w-4 h-4 mr-2" />, color: 'hover:text-primary-600 hover:border-primary-500 hover:bg-primary-50' },
    { label: 'More Food', icon: <Utensils className="w-4 h-4 mr-2" />, color: 'hover:text-accent-600 hover:border-accent-500 hover:bg-accent-50' },
    { label: 'Add Nature', icon: <TreePine className="w-4 h-4 mr-2" />, color: 'hover:text-emerald-600 hover:border-emerald-500 hover:bg-emerald-50' },
    { label: 'More Relaxed', icon: <RotateCcw className="w-4 h-4 mr-2" />, color: 'hover:text-indigo-600 hover:border-indigo-500 hover:bg-indigo-50' },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {actions.map((action, i) => (
        <Button 
          key={i} 
          variant="outline" 
          size="sm" 
          className={`flex-shrink-0 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-colors ${action.color}`}
        >
          {action.icon}
          {action.label}
        </Button>
      ))}
    </div>
  );
}
