import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameStatus } from 'constants/game';
import { GameInfo } from 'models/game.auth';

const initialState: GameInfo = {
  status: GameStatus.Welcome,
  gamesPlayed: 0,
  bestScore: 0,
  currentScore: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameStatus: (state: GameInfo, action: PayloadAction<GameStatus>) => {
      state.status = action.payload;
    },
    incrementGamesPlayed: (state: GameInfo) => {
      state.gamesPlayed++;
    },
  },
});

export const { setGameStatus, incrementGamesPlayed } = gameSlice.actions;

export default gameSlice.reducer;
