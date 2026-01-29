import { createSlice } from '@reduxjs/toolkit';
import { addFavorit, deleteFavorit, getFavorits } from './favoritThunks';
import type { favoritsArraType } from '../types/favoritSchema';

type initialStateType = {
  favorits: favoritsArraType;
  loading: boolean;
  error: string | null;
};

const initialState: initialStateType = {
  favorits: [],
  loading: false,
  error: null,
};

export const favoritSlice = createSlice({
  name: 'favorits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavorits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavorits.fulfilled, (state, { payload }) => {
        state.favorits = payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getFavorits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при получении избранных';
      })
      .addCase(addFavorit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavorit.fulfilled, (state, { payload }) => {
        state.favorits.push(payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addFavorit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при добавлении избранного';
      })
      .addCase(deleteFavorit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFavorit.fulfilled, (state, { payload }) => {
        state.favorits = state.favorits.filter((el) => el.good_id !== payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteFavorit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при удалении избранного';
      });
  },
});

export default favoritSlice.reducer;
