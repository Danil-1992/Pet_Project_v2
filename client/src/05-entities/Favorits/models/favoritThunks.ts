import { createAsyncThunk } from '@reduxjs/toolkit';
import { FavoritService } from '../api/favorit.service';

export const getFavorits = createAsyncThunk(
  'favorit/get',
  async ({ signal }: { signal: AbortSignal }) => {
    const result = await FavoritService.getFavorits(signal);
    return result;
  },
);

export const addFavorit = createAsyncThunk('favorit/add', async (goodId: number) => {
  const result = await FavoritService.addLike(goodId);
  return result;
});

export const deleteFavorit = createAsyncThunk('favorit/delete', async (goodId: number) => {
  await FavoritService.deleteLike(goodId);
  return goodId;
});
