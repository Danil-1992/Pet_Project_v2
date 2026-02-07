import { createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryService } from '../api/category.service';

export const getAllCategories = createAsyncThunk(
  'category/all',
  async ({ signal }: { signal: AbortSignal }) => {
    const result = await CategoryService.getAllCategories(signal);
    return result;
  },
);
