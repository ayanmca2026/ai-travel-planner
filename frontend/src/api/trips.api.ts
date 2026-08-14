import api from './client';
import { Trip, TripCreate } from '@/types/trip';

export const tripService = {
  getTrips: async (): Promise<Trip[]> => {
    const { data } = await api.get('/trips');
    return data;
  },
  
  getTrip: async (id: string): Promise<Trip> => {
    const { data } = await api.get(`/trips/${id}`);
    return data;
  },
  
  createTrip: async (tripData: TripCreate): Promise<Trip> => {
    const { data } = await api.post('/trips', tripData);
    return data;
  },
  
  updateTrip: async (id: string, tripData: Partial<Trip>): Promise<Trip> => {
    const { data } = await api.put(`/trips/${id}`, tripData);
    return data;
  },
  
  deleteTrip: async (id: string): Promise<void> => {
    await api.delete(`/trips/${id}`);
  },
  
  generateItinerary: async (id: string): Promise<any> => {
    const { data } = await api.post(`/trips/${id}/generate`);
    return data;
  },
  
  optimizeTrip: async (id: string): Promise<any> => {
    const { data } = await api.post(`/trips/${id}/optimize`);
    return data;
  }
};
