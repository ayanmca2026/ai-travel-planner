import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tripService } from '@/api/trips.api';
import { TripCreate, Trip } from '@/types/trip';

export const useTrips = () => {
  const queryClient = useQueryClient();

  const tripsQuery = useQuery({
    queryKey: ['trips'],
    queryFn: tripService.getTrips,
  });

  const getTripQuery = (id: string) => useQuery({
    queryKey: ['trips', id],
    queryFn: () => tripService.getTrip(id),
    enabled: !!id,
  });

  const createMutation = useMutation({
    mutationFn: (data: TripCreate) => tripService.createTrip(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trips'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Trip> }) => tripService.updateTrip(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      queryClient.invalidateQueries({ queryKey: ['trips', variables.id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => tripService.deleteTrip(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trips'] }),
  });

  return {
    tripsQuery,
    getTripQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
