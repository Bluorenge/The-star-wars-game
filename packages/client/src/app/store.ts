import { configureStore } from '@reduxjs/toolkit';
import localeReducer from 'app/slices/localeSlice';
import userReducer from 'app/slices/userSlice';

export const store = configureStore({
  reducer: {
    locale: localeReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
