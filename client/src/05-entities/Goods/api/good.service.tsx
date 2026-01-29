import axiosInstance from '@/06-shared/api/axiosInstance';
import { arrayGoodSchema, goodSchema } from '../types/goodSchema';
import { proceedError } from '@/06-shared/catchError';

export const GoodService = {
  async getAllGoods(signal: AbortSignal) {
    try {
      const response = await axiosInstance.get('/goods/all', { signal });
      const validDate = arrayGoodSchema.parse(response.data);
      return validDate;
    } catch (error) {
      proceedError(error);
    }
  },

  async addToBacket(goodId: string) {
    try {
      const response = await axiosInstance.get(`/goods/add/${goodId}`);
      const validDate = goodSchema.parse(response.data);
      return validDate;
    } catch (error) {
      proceedError(error);
    }
  },

  async deleteFromBacket(goodId: string) {
    try {
      const response = await axiosInstance.get(`/goods/delete/${goodId}`);
      const validDate = goodSchema.parse(response.data);
      return validDate;
    } catch (error) {
      proceedError(error);
    }
  },

  async getOneCard(id: string) {
    try {
      const response = await axiosInstance.get(`/goods/${id}`);
      const validDate = goodSchema.parse(response.data);
      return validDate;
    } catch (error) {
      proceedError(error);
    }
  },
};
