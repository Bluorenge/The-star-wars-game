import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Space, Spin, Typography } from 'antd';

import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setGameStatus } from 'core/store/slices/gameSlice';
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
            <Typography.Paragraph className="welcomeWrapper__greetings">
              Добро пожаловать, {isUserFetching ? <Spin /> : currentUser?.login}{' '}
              !
            </Typography.Paragraph>

            <Typography.Paragraph>
              Цель игры: сбить как можно больше имперских кораблей.
            </Typography.Paragraph>

            <Typography.Paragraph>
              Управление кораблем стрелками, выстрелы пробелом
            </Typography.Paragraph>
          </div>

          <Button
            type="primary"
            onClick={() => dispatch(setGameStatus(GameStatus.New))}
          >
            <Link to={ROUTES.GAME_PAGE_PATH}>Начать игру</Link>
          </Button>
        </Space>
      </Row>
    </>
  );
};
