import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameInfo, GameStatus } from 'models/game.auth';

const initialState: GameInfo = {
  status: GameStatus.End,
  gamesPlayed: 0,
  bestScore: 0,
  currentScore: 0,
};

export const gameSlice = createSlice({
  name: 'locale',
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
