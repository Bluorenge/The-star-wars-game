import { GameStatus } from 'constants/game';

export interface GameInfo {
  status: GameStatus;
  gamesPlayed: number;
  currentScore: number;
  bestScore: number;
  time?: number;
  hp?: number;
}
