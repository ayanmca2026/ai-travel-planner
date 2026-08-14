import { BudgetOverview } from '@/components/budget/BudgetOverview';
import { BudgetChart } from '@/components/budget/BudgetChart';
import { BudgetHealthBar } from '@/components/budget/BudgetHealthBar';
import { BudgetOptimizer } from '@/components/budget/BudgetOptimizer';
import { MOCK_BUDGET } from '@/utils/mockData';
import { formatCurrency } from '@/utils/format';
import { Card } from '@/components/common/Card';

export default function BudgetPage() {
  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Budget Analysis</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Comprehensive breakdown of your trip costs and AI savings.</p>
      </div>

      <BudgetOverview analysis={MOCK_BUDGET} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column: Charts and Health */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <h3 className="text-lg font-bold mb-6">Cost Breakdown by Category</h3>
            <BudgetChart categories={MOCK_BUDGET.categories} />
          </Card>
          
          <Card>
            <h3 className="text-lg font-bold mb-6">Category Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium text-right">Allocated</th>
                    <th className="pb-3 font-medium text-right">Estimated Cost</th>
                    <th className="pb-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {MOCK_BUDGET.categories.map((cat, i) => (
                    <tr key={i}>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                          <span className="font-medium">{cat.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-right">{formatCurrency(cat.allocated)}</td>
                      <td className="py-4 text-right font-medium">{formatCurrency(cat.spent)}</td>
                      <td className="py-4 text-right">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          cat.spent > cat.allocated ? 'bg-danger-100 text-danger-700' : 'bg-success-100 text-success-700'
                        }`}>
                          {cat.spent > cat.allocated ? 'Over Budget' : 'On Track'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column: Savings & AI Suggestions */}
        <div className="space-y-8">
          <Card>
            <h3 className="text-lg font-bold mb-6">Overall Health</h3>
            <BudgetHealthBar 
              percentage={(MOCK_BUDGET.totalEstimated / MOCK_BUDGET.totalBudget) * 100} 
              health={MOCK_BUDGET.health} 
            />
          </Card>
          
          <div>
            <h3 className="text-lg font-bold mb-4">AI Savings Opportunities</h3>
            <div className="space-y-4">
              {MOCK_BUDGET.savings.map(s => (
                <BudgetOptimizer key={s.id} suggestion={s} onApply={() => {}} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
