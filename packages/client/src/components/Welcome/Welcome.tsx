import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Space, Spin } from 'antd';

import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setGameStatus } from 'app/slices/gameSlice';
import { GameStatus } from 'constants/game';
import { ROUTES } from 'constants/routes';

import './Welcome.scss';

export const Welcome: FC = () => {
  const { isFetching: isUserFetching, currentUser } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <Row className="welcomeWrapper" align="middle" justify="center">
        <Space direction="vertical" align="center">
          <div className="welcomeWrapper__topContent">
            <div className="welcomeWrapper__greetings">
              Добро пожаловать, {isUserFetching ? <Spin /> : currentUser?.login}{' '}
              !
            </div>

            <p>Цель игры: сбить как можно больше имперских кораблей.</p>

            <p>Управление кораблем стрелками, выстрелы пробелом</p>
          </div>

          <Button
            type="primary"
            onClick={() => dispatch(setGameStatus(GameStatus.Playing))}
          >
            <Link to={ROUTES.GAME_PAGE_PATH}>Начать игру</Link>
          </Button>
        </Space>
      </Row>
    </>
  );
};
