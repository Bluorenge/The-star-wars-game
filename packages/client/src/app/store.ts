import { configureStore } from '@reduxjs/toolkit';

import localeReducer from 'app/slices/localeSlice';
import userReducer from 'app/slices/userSlice';
import gameSlice, { listenerMiddleware } from 'app/slices/gameSlice';

export const store = configureStore({
  reducer: {
    locale: localeReducer,
    user: userReducer,
    game: gameSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
