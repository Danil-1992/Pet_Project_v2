import { createAsyncThunk } from '@reduxjs/toolkit';
import { BackerService } from '../api/backet.service';
import type { backetArrayType } from '../types/backetSchema';

export const getAllGoodsFromBacket = createAsyncThunk(
  'backet/getbyuser',
  async (signal: AbortSignal) => {
    const result = await BackerService.getAllGoodsFromBacket(signal);
    return result;
  },
);

export const addToBacketIn = createAsyncThunk('backet/add', async (goodId: string) => {
  const result = await BackerService.addToBacketIn(goodId);
  return result;
});

export const deleteFromBacketIn = createAsyncThunk('backet/delete', async (goodId: string) => {
  const result = await BackerService.deleteFromBacketIn(goodId);
  return result;
});

export const clearBacket = createAsyncThunk('backet/clear', async (goods: backetArrayType) => {
   await BackerService.clearBacket(goods);
  return goods;
});
