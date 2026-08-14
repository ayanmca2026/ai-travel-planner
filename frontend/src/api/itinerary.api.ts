import api from './client';
import { FullItinerary, ItineraryItem } from '@/types/itinerary';

export const itineraryService = {
  getItinerary: async (tripId: string): Promise<FullItinerary> => {
    const { data } = await api.get(`/trips/${tripId}/itinerary`);
    return data;
  },
  
  updateItem: async (tripId: string, itemId: string, updateData: Partial<ItineraryItem>): Promise<ItineraryItem> => {
    const { data } = await api.put(`/trips/${tripId}/itinerary/items/${itemId}`, updateData);
    return data;
  },
  
  deleteItem: async (tripId: string, itemId: string): Promise<void> => {
    await api.delete(`/trips/${tripId}/itinerary/items/${itemId}`);
  },
  
  addItem: async (tripId: string, dayId: string, itemData: Partial<ItineraryItem>): Promise<ItineraryItem> => {
    const { data } = await api.post(`/trips/${tripId}/itinerary/days/${dayId}/items`, itemData);
    return data;
  },
  
  reorderItems: async (tripId: string, dayId: string, itemIds: string[]): Promise<void> => {
    await api.put(`/trips/${tripId}/itinerary/days/${dayId}/reorder`, { itemIds });
  }
};
