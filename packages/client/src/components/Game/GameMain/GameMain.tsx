import { FC, MutableRefObject, useEffect, useRef } from 'react';
import { Button, Space } from 'antd';

import Display from 'game/Display';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { setGameStatus } from 'app/slices/gameSlice';
import { GameStatus } from 'constants/game';

import './GameMain.scss';

export const GameMain: FC = () => {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.game);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');

    let requestAnimationFrameId: ReturnType<typeof requestAnimationFrame>;

    let display: Display;

    if (context) {
      const isPaused = status === GameStatus.Pause;

      display = new Display(context, isPaused, dispatch);

      display.init();

      const render = () => {
        display.update();
        display.updateState();

        requestAnimationFrameId = requestAnimationFrame(render);
      };
      render();

      window.addEventListener('keydown', display.buttonDownHandler);
      window.addEventListener('keyup', display.buttonUpHandler);
    }

    return () => {
      window.removeEventListener('keydown', display.buttonDownHandler);
      window.removeEventListener('keyup', display.buttonUpHandler);

      cancelAnimationFrame(requestAnimationFrameId);
    };
  }, [status]);

  return (
    <Space direction="vertical" align="center" className="gameMainWrapper">
      <canvas ref={canvasRef} width={800} height={500} />

      <Button
        onKeyDown={(e) => e.preventDefault()}
        onClick={() =>
          dispatch(
            setGameStatus(
              status === GameStatus.Pause
                ? GameStatus.Playing
                : GameStatus.Pause
            )
          )
        }
      >
        {status === GameStatus.Pause ? 'Играть' : 'Пауза'}
      </Button>
    </Space>
  );
};
