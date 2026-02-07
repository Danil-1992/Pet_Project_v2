import { createAsyncThunk } from '@reduxjs/toolkit';
import { BrandService } from '../api/brand.service';

export const getAllBrands = createAsyncThunk(
  'brands/all',
  async ({ signal }: { signal: AbortSignal }) => {
    const result = await BrandService.getAllBrands(signal);
    return result;
  },
);
