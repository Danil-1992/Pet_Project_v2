import { createSlice } from '@reduxjs/toolkit';
import type { categoryArrayType } from '../types/categorySchema';
import { getAllCategories } from './categoryThunks';

type initialStateType = {
  categories: categoryArrayType;
  isLoadingCategories: boolean;
  categoriesError: string | null;
};

const initialState: initialStateType = {
  categories: [],
  isLoadingCategories: false,
  categoriesError: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getAllCategories.pending, (state) => {
        state.isLoadingCategories = true;
        state.categoriesError = null;
      })
      .addCase(getAllCategories.fulfilled, (state, { payload }) => {
        state.categories = payload as categoryArrayType;
        state.isLoadingCategories = false;
        state.categoriesError = null;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoadingCategories = false;
        state.categoriesError = action.error.message ?? 'Ошибка при получении категорий';
      });
  },
});

export default  categoriesSlice.reducer