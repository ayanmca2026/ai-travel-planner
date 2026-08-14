import api from './client';
import { BudgetAnalysis } from '@/types/budget';

export const budgetService = {
  getBudgetAnalysis: async (tripId: string): Promise<BudgetAnalysis> => {
    const { data } = await api.get(`/trips/${tripId}/budget`);
    return data;
  },
  
  optimizeBudget: async (tripId: string, preferences: any): Promise<BudgetAnalysis> => {
    const { data } = await api.post(`/trips/${tripId}/budget/optimize`, preferences);
    return data;
  }
};
