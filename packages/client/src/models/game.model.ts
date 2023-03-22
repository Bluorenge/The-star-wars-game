import { GameStatus } from 'constants/game';

export interface GameInfo {
  status?: GameStatus;
  playerShip: {
    xCord: number;
    yCord: number;
    health: number;
  };
  playerGamesPlayer: number;
  scores: {
    currentGame: number;
    playerBest: number;
    leader: number;
  };
}
