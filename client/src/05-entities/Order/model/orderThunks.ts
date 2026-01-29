import type { backetArrayType } from '@/05-entities/Backet/types/backetSchema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrderService } from '../api/order.service';

export const addOrder = createAsyncThunk(
  'order/add',
  async ({ goods, total }: { goods: backetArrayType; total: number }) => {
    const result = await OrderService.addOrder(goods, total);
    return result;
  },
);

export const getOrdersByUserId = createAsyncThunk('orders/get', async (signal: AbortSignal) => {
  const data = await OrderService.getOrdersByUserId(signal);
  return data;
});
