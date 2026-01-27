import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseService } from '../api/respone.service';

export const getAllComments = createAsyncThunk(
  'response/all',
  async ({ goodId, signal }: { goodId: string; signal: AbortSignal }) => {
    const result = await ResponseService.getComments(goodId, signal);
    return result;
  },
);

export const addComment = createAsyncThunk(
  'comment/add',
  async ({ goodId, comment }: { goodId: string; comment: string }) => {
    const res = await ResponseService.addComment(comment, goodId);
    return res;
  },
);
