import backetSlice from '@/05-entities/Backet/model/backetSlice';
import favoritSlice from '@/05-entities/Favorits/models/favoritSlice';
import goodSlice from '@/05-entities/Goods/model/goodSlice';
import orderSlice from '@/05-entities/Order/model/orderSlice';
import responseSlice from '@/05-entities/Response/model/responseSlice';
import userSlice from '@/05-entities/User/model/userSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    goods: goodSlice,
    favorits: favoritSlice,
    user: userSlice,
    responses: responseSlice,
    backet: backetSlice,
    orders: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
