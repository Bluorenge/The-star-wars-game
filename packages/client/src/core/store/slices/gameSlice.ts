import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GameInfo } from 'models/game.model';
import { GameStatus } from 'constants/game';

const initialState: GameInfo = {};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameStatus: (state: GameInfo, action: PayloadAction<GameStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setGameStatus } = gameSlice.actions;

export default gameSlice.reducer;
