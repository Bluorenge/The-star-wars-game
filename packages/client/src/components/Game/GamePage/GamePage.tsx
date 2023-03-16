import { MutableRefObject, useEffect, useRef } from 'react';

import Display from 'game/Display';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { GameStatus } from 'models/game.auth';
import { setGameStatus } from 'app/slices/gameSlice';

import './GamePage.scss';

export const GamePage = () => {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');

    let interval: ReturnType<typeof requestAnimationFrame>;

    let display: Display;

    const widthMargin = 20;
    const heightMargin = 80;

    if (context) {
      canvas.width = window.innerWidth - widthMargin;
      canvas.height = window.innerHeight - heightMargin;
      canvas.style.width = `${window.innerWidth - widthMargin}px`;
      canvas.style.height = `${window.innerHeight - heightMargin}px`;

      display = new Display(
        context,
        window.innerWidth - widthMargin,
        window.innerHeight - heightMargin,
        () => dispatch(setGameStatus(GameStatus.End))
      );

      display.init();

      const render = () => {
        display.update();

        interval = requestAnimationFrame(render);
      };
      render();

      window.addEventListener('keydown', display.buttonDownHandler);
      window.addEventListener('keyup', display.buttonUpHandler);
    }

    return () => {
      window.removeEventListener('keydown', display.buttonDownHandler);
      window.removeEventListener('keyup', display.buttonUpHandler);

      cancelAnimationFrame(interval);
    };
  });

  return (
    <div className="gameWrapper">
      <canvas ref={canvasRef} />
    </div>
  );
};
