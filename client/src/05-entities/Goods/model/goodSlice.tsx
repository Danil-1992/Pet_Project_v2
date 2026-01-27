import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { arrayGoodType, goodType } from '../types/goodSchema';
import { addToBacket, deleteFromBacket, getAllGoods } from './goodThunks';

type initialStateType = {
  goods: arrayGoodType;
  card: goodType | undefined;
  loading: boolean;
  error: string | null;
};

const initialState: initialStateType = {
  goods: [],
  card: undefined,
  loading: false,
  error: null,
};

export const goodSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    getOneCard(state, action: PayloadAction<number>) {
      const good = state.goods.find((el) => el.id === action.payload);
      if (good) {
        state.card = good;
      }
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getAllGoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllGoods.fulfilled, (state, { payload }) => {
        state.goods = payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllGoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при загрузке товаров';
      });
    builders
      .addCase(addToBacket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToBacket.fulfilled, (state, { payload }) => {
        state.goods = state.goods.map((el) => (el.id === payload.id ? payload : el));
      })
      .addCase(addToBacket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при добавлении в корзину';
      });
    builders
      .addCase(deleteFromBacket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFromBacket.fulfilled, (state, { payload }) => {
        state.goods = state.goods.map((el) => (el.id === payload.id ? payload : el));
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteFromBacket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при удалении из корзины';
      });
  },
});

export default goodSlice.reducer;
export const { getOneCard } = goodSlice.actions;
