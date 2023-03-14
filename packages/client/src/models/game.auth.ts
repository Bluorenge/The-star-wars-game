export interface GameInfo {
  status: GameStatus;
  gamesPlayed: number;
  currentScore: number;
  bestScore: number;
  time?: number;
  hp?: number;
}

export enum GameStatus {
  Welcome = 'welcome',
  Start = 'start',
  Pause = 'pause',
  End = 'end',
}
