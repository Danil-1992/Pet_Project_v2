import type { backetArrayType } from '@/05-entities/Backet/types/backetSchema';
import axiosInstance from '@/06-shared/api/axiosInstance';
import { orderSchema, orderSchemaWithOrIt } from '../types/orderSchema';
import { proceedError } from '@/06-shared/catchError';

export const OrderService = {
  async addOrder(backetGoods: backetArrayType, summ: number) {
    try {
      const response = await axiosInstance.post('/orders/', { goods: backetGoods, price: summ });
      const validDate = orderSchema.parse(response.data);
      return validDate;
    } catch (error) {
      proceedError(error);
    }
  },

  async getOrdersByUserId(signal: AbortSignal) {
    try {
      const response = await axiosInstance.get('/orders/', { signal });
      const data = orderSchemaWithOrIt.parse(response.data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
