import axiosInstance from '@/06-shared/api/axiosInstance';
import type { favoritArrayType } from '../types/favoritSchema';
import { favoritsArraySchema, favoritsSchema } from '../types/favoritSchema';
import { proceedError } from '@/06-shared/catchError';

export const FavoritService = {
  async getFavorits(signal: AbortSignal): Promise<favoritArrayType | undefined> {
    try {
      const response = await axiosInstance.get('/favorits/byuser', { signal });
      const validDate = favoritsArraySchema.parse(response.data);
      return validDate;
    } catch (error) {
      proceedError(error);
    }
  },

  async addLike(goodId: number) {
    try {
      const response = await axiosInstance.post(`/favorits/${goodId.toString()}`);
      const validDate = favoritsSchema.parse(response.data);
      return validDate;
    } catch (error) {
      proceedError(error);
    }
  },

  async deleteLike(goodId: number) {
    try {
      await axiosInstance.delete(`/favorits/${goodId.toString()}`);
    } catch (error) {
      proceedError(error);
    }
  },
};
