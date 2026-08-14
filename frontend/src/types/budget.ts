export enum BudgetHealth {
  HEALTHY = 'HEALTHY',
  WARNING = 'WARNING',
  DANGER = 'DANGER'
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

export interface SavingSuggestion {
  id: string;
  title: string;
  description: string;
  originalCost: number;
  suggestedCost: number;
  savingsAmount: number;
  category: string;
  actionText: string;
}

export interface BudgetAnalysis {
  totalBudget: number;
  totalEstimated: number;
  remaining: number;
  perPerson: number;
  health: BudgetHealth;
  categories: BudgetCategory[];
  savings: SavingSuggestion[];
}
