import { createSlice } from '@reduxjs/toolkit';
import type { responseArrayByUserType, responseArrayType } from '../types/responseSchema';
import { addComment, getAllComments, getAllResponsesByUser } from './responseThunks';

type initialStateType = {
  responses: responseArrayType;
  allMyResponses: responseArrayByUserType;
  loading: boolean;
  error: string | null;
};

const initialState: initialStateType = {
  responses: [],
  allMyResponses: [],
  loading: false,
  error: null,
};

export const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllComments.fulfilled, (state, { payload }) => {
        state.responses = payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при получении комментариев';
      });
    builders
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.responses.push(payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при добавлении коммента';
      });
    builders
      .addCase(getAllResponsesByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllResponsesByUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.allMyResponses = payload;
      })
      .addCase(getAllResponsesByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка при загрузке моих отзывов';
      });
  },
});

export default responseSlice.reducer;
