import { configureStore } from '@reduxjs/toolkit';

import localeReducer from 'app/slices/localeSlice';
import userReducer from 'app/slices/userSlice';
import gameReducer from 'app/slices/gameSlice';
import forumReducer from './slices/forumSlice';
import { listenerMiddleware } from 'app/middlewares/middlewares';
import { CurrentUser, IUserService } from 'models/auth.model';

export interface StoreState {
  user: {
    isAuth: boolean;
    isFetching: boolean;
    currentUser: CurrentUser | null;
  };
}

export function createStore(service: IUserService, initialState?: StoreState) {
  return configureStore({
    reducer: {
      locale: localeReducer,
      user: userReducer,
      game: gameReducer,
      forum: forumReducer,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: service,
        },
      }).concat(listenerMiddleware.middleware),
  });
}

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
