import type { backetArrayType } from '@/05-entities/Backet/types/backetSchema';
import axiosInstance from '@/06-shared/api/axiosInstance';
import { orderSchema } from '../types/orderSchema';
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
};
