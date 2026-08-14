import api from './client';
import { Place, Destination, SavedPlace } from '@/types/map';

export const placeService = {
  searchPlaces: async (query: string, location?: string): Promise<Place[]> => {
    const { data } = await api.get('/places/search', { params: { query, location } });
    return data;
  },
  
  getDestinations: async (): Promise<Destination[]> => {
    const { data } = await api.get('/places/destinations');
    return data;
  },
  
  getDestination: async (id: string): Promise<Destination> => {
    const { data } = await api.get(`/places/destinations/${id}`);
    return data;
  },
  
  savePlace: async (placeId: string, notes?: string): Promise<SavedPlace> => {
    const { data } = await api.post(`/places/saved`, { placeId, notes });
    return data;
  },
  
  getSavedPlaces: async (): Promise<SavedPlace[]> => {
    const { data } = await api.get('/places/saved');
    return data;
  },
  
  unsavePlace: async (id: string): Promise<void> => {
    await api.delete(`/places/saved/${id}`);
  }
};
