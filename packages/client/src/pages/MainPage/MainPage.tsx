import { FC } from 'react';

import { useAppSelector } from 'hooks/useAppSelector';
import { GameStatus } from 'constants/game';

import { WelcomePage } from 'components/Game/WelcomePage';
import { GamePage } from 'components/Game/GamePage';
import { EndGamePage } from 'components/Game/EndGamePage';

export const MainPage: FC = () => {
  const { status } = useAppSelector((state) => state.game);
  let page;

  switch (status) {
    case GameStatus.Start:
      page = <GamePage />;
      break;
    case GameStatus.End:
      page = <EndGamePage />;
      break;
    default:
      page = <WelcomePage />;
  }

  return page;
};
