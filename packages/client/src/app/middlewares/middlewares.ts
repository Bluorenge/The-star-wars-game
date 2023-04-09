import { createListenerMiddleware } from '@reduxjs/toolkit';

import { setGameStatus } from 'app/slices/gameSlice';
import { GameStatus } from 'constants/game';
import { LOCAL_STORAGE_CURRENT_GAME_SCORE } from 'constants/localStorage';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setGameStatus,
  effect: (action) => {
    if (action.payload === GameStatus.New) {
      window.localStorage.removeItem(LOCAL_STORAGE_CURRENT_GAME_SCORE);
    }
  },
});
