import { FC } from 'react';
import { Button, Row, Space, Spin } from 'antd';

import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setGameStatus } from 'app/slices/gameSlice';
import { GameStatus } from 'constants/game';

import './WelcomePage.scss';

export const WelcomePage: FC = () => {
  const { isFetching: isUserFetching, currentUser } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <Row className="welcomePageWrapper" align="middle" justify="center">
        <Space direction="vertical" align="center">
          <div className="welcomePageWrapper__topContent">
            <div className="welcomePageWrapper__greetings">
              Добро пожаловать, {isUserFetching ? <Spin /> : currentUser?.login}{' '}
              !
            </div>

            <p>Цель игры: сбить как можно больше имперских кораблей.</p>

            <p>Управление кораблем стрелками, выстрелы пробелом</p>
          </div>

          <Button
            type="primary"
            onClick={() => dispatch(setGameStatus(GameStatus.Start))}
          >
            Начать игру
          </Button>
        </Space>
      </Row>
    </>
  );
};
