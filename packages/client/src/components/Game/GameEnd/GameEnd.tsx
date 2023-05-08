import { Button, Col, Row, Space, Typography } from 'antd';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { setGameStatus } from 'core/store/slices/gameSlice';
import { GameStatus } from 'constants/game';
import {
  LOCAL_STORAGE_PLAYER_GAMES_PLAYED,
  LOCAL_STORAGE_CURRENT_GAME_SCORE,
  LOCAL_STORAGE_PLAYER_BEST_GAME_SCORE,
  LOCAL_STORAGE_LEADER_GAME_SCORE,
} from 'constants/localStorage';

import './GameEnd.scss';

export const GameEnd = () => {
  const dispatch = useAppDispatch();

  const gamesPlayed =
    Number(window.localStorage.getItem(LOCAL_STORAGE_PLAYER_GAMES_PLAYED)) || 0;
  const currentScore =
    Number(window.localStorage.getItem(LOCAL_STORAGE_CURRENT_GAME_SCORE)) || 0;
  const playerBestScore =
    Number(window.localStorage.getItem(LOCAL_STORAGE_PLAYER_BEST_GAME_SCORE)) ||
    0;
  const leaderScore =
    Number(window.localStorage.getItem(LOCAL_STORAGE_LEADER_GAME_SCORE)) || 0;

  return (
    <Row className="gameEndWrapper" align="middle" justify="center">
      <Space direction="vertical" align="center">
        <Row gutter={16}>
          <Col>
            <Typography.Text>Игр сыграно: {gamesPlayed}</Typography.Text>
          </Col>

          <Col>
            <Typography.Text>Счёт игры: {currentScore}</Typography.Text>
          </Col>

          <Col>
            <Typography.Text>Ваш рекорд: {playerBestScore}</Typography.Text>
          </Col>

          <Col>
            <Typography.Text>Рекорд лидера: {leaderScore}</Typography.Text>
          </Col>
        </Row>

        <Row>
          <Typography.Paragraph className="gameEndWrapper__endText">
            Игра окончена
          </Typography.Paragraph>
        </Row>

        <Button
          type="primary"
          onClick={() => dispatch(setGameStatus(GameStatus.New))}
        >
          Новая игра
        </Button>
      </Space>
    </Row>
  );
};
