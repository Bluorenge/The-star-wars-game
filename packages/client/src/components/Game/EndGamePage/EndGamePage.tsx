import { Button, Col, Row, Space } from 'antd';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { setGameStatus } from 'app/slices/gameSlice';
import { GameStatus } from 'constants/game';

import './EndGamePage.scss';

export const EndGamePage = () => {
  const { gamesPlayed, currentScore, bestScore } = useAppSelector(
    (state) => state.game
  );
  const dispatch = useAppDispatch();

  return (
    <Row className="endGamePageWrapper" align="middle" justify="center">
      <Space direction="vertical" align="center">
        <Row gutter={16}>
          <Col>
            <p>Игр сыграно: {gamesPlayed}</p>
          </Col>

          <Col>
            <p>Счёт игры: {currentScore}</p>
          </Col>

          <Col>
            <p>Лучший счёт: {bestScore}</p>
          </Col>
        </Row>

        <Row>
          <p className="endGamePageWrapper__endText">Игра окончена</p>
        </Row>

        <Button
          type="primary"
          onClick={() => dispatch(setGameStatus(GameStatus.Start))}
        >
          Новая игра
        </Button>
      </Space>
    </Row>
  );
};
