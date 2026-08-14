import { Card } from '@/components/common/Card';
import { BudgetAnalysis } from '@/types/budget';
import { formatCurrency } from '@/utils/format';
import { Wallet, Target, PiggyBank } from 'lucide-react';

export function BudgetOverview({ analysis }: { analysis: BudgetAnalysis }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="flex items-center gap-4 bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800">
        <div className="p-4 bg-primary-100 dark:bg-primary-800 rounded-full text-primary-600 dark:text-primary-400">
          <Target className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Budget</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(analysis.totalBudget)}</h3>
        </div>
      </Card>
      
      <Card className="flex items-center gap-4 bg-accent-50 dark:bg-accent-900/20 border-accent-100 dark:border-accent-800">
        <div className="p-4 bg-accent-100 dark:bg-accent-800 rounded-full text-accent-600 dark:text-accent-400">
          <Wallet className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Estimated Cost</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(analysis.totalEstimated)}</h3>
        </div>
      </Card>
      
      <Card className="flex items-center gap-4 bg-success-50 dark:bg-success-900/20 border-success-100 dark:border-success-800">
        <div className="p-4 bg-success-100 dark:bg-success-800 rounded-full text-success-600 dark:text-success-400">
          <PiggyBank className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Remaining / Savings</p>
          <h3 className="text-2xl font-bold text-success-600 dark:text-success-400">{formatCurrency(analysis.remaining)}</h3>
        </div>
      </Card>
    </div>
  );
}
