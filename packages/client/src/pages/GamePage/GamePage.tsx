import { FC } from 'react';

import { Layout } from 'layouts/Layout';
import { GameMain } from 'components/Game';
import { GameEnd } from 'components/Game/GameEnd';
import { useAppSelector } from 'hooks/useAppSelector';
import { GameStatus } from 'constants/game';

export const GamePage: FC = () => {
  const { status } = useAppSelector((state) => state.game);

  return (
    <>
      <Layout />
      {status !== GameStatus.End ? <GameMain /> : <GameEnd />}
    </>
  );
};
