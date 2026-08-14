import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itineraryService } from '@/api/itinerary.api';
import { ItineraryItem } from '@/types/itinerary';

export const useItinerary = (tripId: string) => {
  const queryClient = useQueryClient();

  const itineraryQuery = useQuery({
    queryKey: ['itinerary', tripId],
    queryFn: () => itineraryService.getItinerary(tripId),
    enabled: !!tripId,
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ itemId, data }: { itemId: string; data: Partial<ItineraryItem> }) => 
      itineraryService.updateItem(tripId, itemId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['itinerary', tripId] }),
  });

  const deleteItemMutation = useMutation({
    mutationFn: (itemId: string) => itineraryService.deleteItem(tripId, itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['itinerary', tripId] }),
  });

  return {
    itineraryQuery,
    updateItemMutation,
    deleteItemMutation,
  };
};
