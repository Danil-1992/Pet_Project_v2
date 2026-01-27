import axiosInstance from '@/06-shared/api/axiosInstance';
import type { backetArrayType } from '../types/backetSchema';
import { backetArraySchema, backetSchema, respSchema } from '../types/backetSchema';
import { proceedError } from '@/06-shared/catchError';

export const BackerService = {
  async getAllGoodsFromBacket(signal: AbortSignal) {
    try {
      const response = await axiosInstance.get('/backet/byuser', { signal });
      const validDate = backetArraySchema.parse(response.data);
      return validDate;
    } catch (error) {
      proceedError(error);
    }
  },

  async addToBacketIn(goodId: string) {
    try {
      const response = await axiosInstance.post(`/backet/${goodId}`);
      const validDate = backetSchema.parse(response.data);
      return validDate;
    } catch (error) {
      proceedError(error);
    }
  },

  async deleteFromBacketIn(goodId: string) {
    try {
      const response = await axiosInstance.delete(`/backet/${goodId}`);
      const validDate = backetSchema.parse(response.data);
      return validDate;
    } catch (error) {
      proceedError(error);
    }
  },

  async clearBacket(goods: backetArrayType) {
    try {
      const response = await axiosInstance.delete('/backet/frombacket', { data: goods });
      const validDate = respSchema.parse(response.data);
      return validDate;
    } catch (error) {
      proceedError(error);
    }
  },
};
