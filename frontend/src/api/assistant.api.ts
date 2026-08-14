import api from './client';

export const aiService = {
  chatWithAssistant: async (tripId: string, message: string): Promise<any> => {
    const { data } = await api.post(`/trips/${tripId}/ai/chat`, { message });
    return data;
  },
  
  getOptimizationSuggestions: async (tripId: string): Promise<any> => {
    const { data } = await api.get(`/trips/${tripId}/ai/optimizations`);
    return data;
  }
};
