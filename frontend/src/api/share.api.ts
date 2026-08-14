import api from './client';
import { Trip } from '@/types/trip';

export const shareService = {
  generateShareLink: async (tripId: string, permissions: 'read' | 'edit' = 'read'): Promise<{ url: string; shareId: string }> => {
    const { data } = await api.post(`/trips/${tripId}/share`, { permissions });
    return data;
  },
  
  getSharedTrip: async (shareId: string): Promise<Trip> => {
    const { data } = await api.get(`/shared/${shareId}`);
    return data;
  }
};
