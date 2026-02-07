import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { arrayGoodType, goodType } from '../types/goodSchema';
import {
  addToBacket,
  deleteFromBacket,
  filterGoods,
  getAllGoods,
  getGoodBySearch,
  getOneCards,
} from './goodThunks';

type initialStateType = {
  goods: arrayGoodType;
  card: goodType | undefined;
  isLoadingGoods: boolean;
  goodsError: string | null;
};

const initialState: initialStateType = {
  goods: [],
  card: undefined,
  isLoadingGoods: false,
  goodsError: null,
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
        state.isLoadingGoods = true;
        state.goodsError = null;
      })
      .addCase(getAllGoods.fulfilled, (state, { payload }) => {
        state.goods = payload as arrayGoodType;
        state.isLoadingGoods = false;
        state.goodsError = null;
      })
      .addCase(getAllGoods.rejected, (state, action) => {
        state.isLoadingGoods = false;
        state.goodsError = action.error.message ?? 'Ошибка при загрузке товаров';
      });
    builders
      .addCase(addToBacket.pending, (state) => {
        state.isLoadingGoods = true;
        state.goodsError = null;
      })
      .addCase(addToBacket.fulfilled, (state, { payload }) => {
        state.goods = state.goods.map((el) => (el.id === payload.id ? payload : el));
      })
      .addCase(addToBacket.rejected, (state, action) => {
        state.isLoadingGoods = false;
        state.goodsError = action.error.message ?? 'Ошибка при добавлении в корзину';
      });
    builders
      .addCase(deleteFromBacket.pending, (state) => {
        state.isLoadingGoods = true;
        state.goodsError = null;
      })
      .addCase(deleteFromBacket.fulfilled, (state, { payload }) => {
        state.goods = state.goods.map((el) => (el.id === payload.id ? payload : el));
        state.isLoadingGoods = false;
        state.goodsError = null;
      })
      .addCase(deleteFromBacket.rejected, (state, action) => {
        state.isLoadingGoods = false;
        state.goodsError = action.error.message ?? 'Ошибка при удалении из корзины';
      });
    builders
      .addCase(getOneCards.pending, (state) => {
        state.isLoadingGoods = true;
        state.goodsError = null;
      })
      .addCase(getOneCards.fulfilled, (state, { payload }) => {
        state.isLoadingGoods = false;
        state.goodsError = null;
        state.card = payload;
      })
      .addCase(getOneCards.rejected, (state, action) => {
        state.isLoadingGoods = false;
        state.goodsError = action.error.message ?? 'Ошибка при загрузке карточки';
      });
    builders
      .addCase(getGoodBySearch.pending, (state) => {
        state.isLoadingGoods = true;
        state.goodsError = null;
      })
      .addCase(getGoodBySearch.fulfilled, (state, { payload }) => {
        state.goods = payload as arrayGoodType;
        state.isLoadingGoods = false;
        state.goodsError = null;
      })
      .addCase(getGoodBySearch.rejected, (state, action) => {
        state.isLoadingGoods = false;
        state.goodsError = action.error.message ?? 'Ошибка при загрузке поискового запроса';
      });
    builders
      .addCase(filterGoods.pending, (state) => {
        state.isLoadingGoods = true;
        state.goodsError = null;
      })
      .addCase(filterGoods.fulfilled, (state, { payload }) => {
        state.goods = payload as arrayGoodType;
        state.isLoadingGoods = false;
        state.goodsError = null;
      })
      .addCase(filterGoods.rejected, (state, action) => {
        state.isLoadingGoods = false;
        state.goodsError = action.error.message ?? 'Ошибка при фильтрации товаров';
      });
  },
});

export default goodSlice.reducer;
export const { getOneCard } = goodSlice.actions;
