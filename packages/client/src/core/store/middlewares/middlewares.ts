import { createListenerMiddleware } from '@reduxjs/toolkit';

import { setGameStatus } from 'core/store/slices/gameSlice';
import { GameStatus } from 'constants/game';
import {
  LOCAL_STORAGE_CURRENT_GAME_SCORE,
  LOCAL_STORAGE_PLAYER_BEST_GAME_SCORE,
} from 'constants/localStorage';
import { RootState } from '../store';
import { Leader } from 'models/leaderboard.model';
import { LEADERBOARD_NAME } from 'constants/main';
import { addNewLeader } from '../actions/leaderboardAction';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setGameStatus,
  effect: async (action, listenerApi) => {
    if (action.payload === GameStatus.New) {
      window.localStorage.removeItem(LOCAL_STORAGE_CURRENT_GAME_SCORE);
      return;
    }

    if (action.payload === GameStatus.End) {
      const state: RootState = listenerApi.getState() as RootState;
      const currentUser = state.user.currentUser;

      const data: Leader = {
        user_name: currentUser?.displayName || currentUser?.login || '',
        avatar: currentUser?.avatar,
        score: parseInt(
          window.localStorage.getItem(LOCAL_STORAGE_PLAYER_BEST_GAME_SCORE) ||
            '0',
          10
        ),
      };

      await listenerApi.dispatch(
        addNewLeader({
          ratingFieldName: 'score',
          data,
          teamName: LEADERBOARD_NAME,
        })
      );
    }
  },
});
