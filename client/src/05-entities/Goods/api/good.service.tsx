import axiosInstance from '@/06-shared/api/axiosInstance';
import type { filterGoodsType } from '../types/goodSchema';
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

  async getGoodBySearch(word: string, signal: AbortSignal) {
    try {
      const response = await axiosInstance.get(`/goods/search?name=${word}`, { signal });
      const validDate = arrayGoodSchema.parse(response.data);
      return validDate;
    } catch (error) {
      console.log(error);
      proceedError(error);
    }
  },

  async filterGoods(obj: filterGoodsType) {
    try {
      const response = await axiosInstance.post('goods/filtered', obj);
      const validDate = arrayGoodSchema.parse(response.data);
      return validDate;
    } catch (error) {
      console.log(error);
      proceedError(error);
    }
  },
};
