import { createSlice } from '@reduxjs/toolkit';
import type { orderArrayType } from '../types/orderSchema';
import { addOrder } from './orderThunks';

type initialStateType = {
  orders: orderArrayType;
  loading: boolean;
  error: string | null;
};

const initialState: initialStateType = {
  orders: [],
  loading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, { payload }) => {
        state.orders.push(payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при добавлении заказа';
      });
  },
});

export default orderSlice.reducer