import { createSlice } from '@reduxjs/toolkit';
import type { backetArrayType } from '../types/backetSchema';
import {
  addToBacketIn,
  clearBacket,
  deleteFromBacketIn,
  getAllGoodsFromBacket,
} from './backetThunks';

type initialStateType = {
  backetGoods: backetArrayType;
  loading: boolean;
  error: string | null;
};

const initialState: initialStateType = {
  backetGoods: [],
  loading: false,
  error: null,
};

export const backetSlice = createSlice({
  name: 'backet',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getAllGoodsFromBacket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllGoodsFromBacket.fulfilled, (state, { payload }) => {
        state.backetGoods = payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllGoodsFromBacket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при получении корзины';
      });
    builders
      .addCase(addToBacketIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToBacketIn.fulfilled, (state, { payload }) => {
        const good = state.backetGoods.find((el) => el.good_id === payload.good_id);
        if (good) {
          good.quantity += 1;
        } else {
          state.backetGoods.push(payload);
        }
      })
      .addCase(addToBacketIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при обавлении в корзину';
      });
    builders
      .addCase(deleteFromBacketIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFromBacketIn.fulfilled, (state, { payload }) => {
        const good = state.backetGoods.find((el) => el.good_id === payload.good_id);
        if (good) {
          good.quantity -= 1;
        }
      })
      .addCase(deleteFromBacketIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при уменьшении товара из корзины';
      });
    builders
      .addCase(clearBacket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearBacket.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.backetGoods = state.backetGoods.filter((good) => {
          const oneGood = payload.find((el) => el.good_id === good.good_id);
          return !oneGood;
        });
      })
      .addCase(clearBacket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при очистки корзины при заказе';
      });
  },
});

export default backetSlice.reducer;
