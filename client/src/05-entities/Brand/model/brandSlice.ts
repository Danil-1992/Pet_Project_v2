import { createSlice } from '@reduxjs/toolkit';
import type { brandArrayType } from '../types/brandTypes';
import { getAllBrands } from './brandThunks';

type initialStateType = {
  brands: brandArrayType;
  isLoadingBrands: boolean;
  brandsError: string | null;
};

const initialState: initialStateType = {
  brands: [],
  isLoadingBrands: false,
  brandsError: null,
};

export const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getAllBrands.pending, (state) => {
        state.isLoadingBrands = true;
        state.brandsError = null;
      })
      .addCase(getAllBrands.fulfilled, (state, { payload }) => {
        state.brands = payload as brandArrayType;
        state.isLoadingBrands = false;
        state.brandsError = null;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.isLoadingBrands = false;
        state.brandsError = action.error.message ?? 'Ошибка при загрузке бренда';
      });
  },
});

export default brandsSlice.reducer;
