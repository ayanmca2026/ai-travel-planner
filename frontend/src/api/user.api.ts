import api from './client';

export const userService = {
  getProfile: async () => {
    const { data } = await api.get('/users/me/profile');
    return data;
  },
  
  updateProfile: async (profileData: any) => {
    const { data } = await api.put('/users/me/profile', profileData);
    return data;
  },
  
  updateUser: async (userData: any) => {
    const { data } = await api.put('/users/me', userData);
    return data;
  },
  
  deleteAccount: async () => {
    const { data } = await api.delete('/users/me');
    return data;
  }
};
