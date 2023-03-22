import {
  createListenerMiddleware,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { GameInfo } from 'models/game.model';
import { GameStatus } from 'constants/game';
import {
  LOCAL_STORAGE_PLAYER_SHIP_X_CORD,
  LOCAL_STORAGE_PLAYER_SHIP_Y_CORD,
  LOCAL_STORAGE_PLAYER_SHIP_HEALTH,
  LOCAL_STORAGE_CURRENT_GAME_SCORE,
  LOCAL_STORAGE_PLAYER_BEST_GAME_SCORE,
} from 'constants/localStorage';
import { RootState } from 'app/store';

const initialState: GameInfo = {
  playerShip: {
    xCord:
      Number(window.localStorage.getItem(LOCAL_STORAGE_PLAYER_SHIP_X_CORD)) ||
      0,
    yCord:
      Number(window.localStorage.getItem(LOCAL_STORAGE_PLAYER_SHIP_Y_CORD)) ||
      0,
    health:
      Number(window.localStorage.getItem(LOCAL_STORAGE_PLAYER_SHIP_HEALTH)) ||
      100,
  },
  playerGamesPlayer: 0,
  scores: {
    currentGame:
      Number(window.localStorage.getItem(LOCAL_STORAGE_CURRENT_GAME_SCORE)) ||
      0,
    playerBest:
      Number(
        window.localStorage.getItem(LOCAL_STORAGE_PLAYER_BEST_GAME_SCORE)
      ) || 0,
    leader: 0,
  },
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameStatus: (state: GameInfo, action: PayloadAction<GameStatus>) => {
      state.status = action.payload;
    },
    setShipInfo: (
      state: GameInfo,
      action: PayloadAction<GameInfo['playerShip']>
    ) => {
      state.playerShip = action.payload;
    },
  },
});

export const { setGameStatus, setShipInfo } = gameSlice.actions;

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  actionCreator: setShipInfo,
  effect: (action, listenerApi) => {
    console.log('listenerApi: ', listenerApi);

    localStorage.setItem(
      LOCAL_STORAGE_PLAYER_SHIP_X_CORD,
      JSON.stringify(
        (listenerApi.getState() as RootState).game.playerShip.xCord
      )
    );
  },
});

export default gameSlice.reducer;
