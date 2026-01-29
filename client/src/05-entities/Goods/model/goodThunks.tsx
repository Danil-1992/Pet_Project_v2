import { createAsyncThunk } from '@reduxjs/toolkit';
import { GoodService } from '../api/good.service';

export const getAllGoods = createAsyncThunk('goods/all', async (signal: AbortSignal) => {
  const goods = await GoodService.getAllGoods(signal);
  return goods;
});

export const addToBacket = createAsyncThunk('good/addToBacket', async (goodId: string) => {
  const result = await GoodService.addToBacket(goodId);
  return result;
});

export const deleteFromBacket = createAsyncThunk('good/delete', async (goodId: string) => {
  const result = await GoodService.deleteFromBacket(goodId);
  return result;
});

export const getOneCards = createAsyncThunk('goods/onecard', async (id: string) => {
  const result = await GoodService.getOneCard(id);
  return result;
});
