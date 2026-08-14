import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { budgetService } from '@/api/budget.api';

export const useBudget = (tripId: string) => {
  const queryClient = useQueryClient();

  const budgetQuery = useQuery({
    queryKey: ['budget', tripId],
    queryFn: () => budgetService.getBudgetAnalysis(tripId),
    enabled: !!tripId,
  });

  const optimizeMutation = useMutation({
    mutationFn: (preferences: any) => budgetService.optimizeBudget(tripId, preferences),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budget', tripId] }),
  });

  return {
    budgetQuery,
    optimizeMutation,
  };
};
