import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { SavingSuggestion } from '@/types/budget';
import { formatCurrency } from '@/utils/format';
import { Sparkles, ArrowRight } from 'lucide-react';

interface BudgetOptimizerProps {
  suggestion: SavingSuggestion;
  onApply: (id: string) => void;
}

export function BudgetOptimizer({ suggestion, onApply }: BudgetOptimizerProps) {
  return (
    <Card className="border border-success-100 dark:border-success-900/50 bg-success-50/50 dark:bg-success-900/10">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 text-success-600 dark:text-success-400 font-bold">
          <Sparkles className="w-5 h-5" />
          Save {formatCurrency(suggestion.savingsAmount)}
        </div>
        <span className="text-xs font-medium px-2 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
          {suggestion.category}
        </span>
      </div>
      
      <h4 className="font-bold text-lg mb-2">{suggestion.title}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{suggestion.description}</p>
      
      <div className="flex items-center gap-4 mb-6 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
        <div className="flex-1 text-center">
          <p className="text-xs text-slate-500 mb-1">Original</p>
          <p className="font-medium line-through text-slate-400">{formatCurrency(suggestion.originalCost)}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-300" />
        <div className="flex-1 text-center">
          <p className="text-xs text-success-600 mb-1">Suggested</p>
          <p className="font-bold text-success-600">{formatCurrency(suggestion.suggestedCost)}</p>
        </div>
      </div>
      
      <Button 
        className="w-full bg-success-600 hover:bg-success-700 text-white border-none"
        onClick={() => onApply(suggestion.id)}
      >
        {suggestion.actionText}
      </Button>
    </Card>
  );
}
