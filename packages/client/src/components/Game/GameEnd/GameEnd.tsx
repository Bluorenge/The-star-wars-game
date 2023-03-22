import { Button, Col, Row, Space } from 'antd';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { setGameStatus } from 'app/slices/gameSlice';
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
  // const { status } = useAppSelector((state) => state.game);

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
            <p>Игр сыграно: {gamesPlayed}</p>
          </Col>

          <Col>
            <p>Счёт игры: {currentScore}</p>
          </Col>

          <Col>
            <p>Ваш рекорд: {playerBestScore}</p>
          </Col>

          <Col>
            <p>Рекорд лидера: {leaderScore}</p>
          </Col>
        </Row>

        <Row>
          <p className="gameEndWrapper__endText">Игра окончена</p>
        </Row>

        <Button
          type="primary"
          onClick={() => dispatch(setGameStatus(GameStatus.Playing))}
        >
          Новая игра
        </Button>
      </Space>
    </Row>
  );
};
