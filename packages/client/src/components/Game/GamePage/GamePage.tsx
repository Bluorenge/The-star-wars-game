import { MutableRefObject, useEffect, useRef } from 'react';

import Display from 'game/Display';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setGameStatus } from 'app/slices/gameSlice';
import { GameStatus } from 'constants/game';

import './GamePage.scss';

export const GamePage = () => {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');

    let requestAnimationFrameId: ReturnType<typeof requestAnimationFrame>;

    let display: Display;

    const WIDTH_MARGIN = 20;
    const HEIGHT_MARGIN = 80;

    if (context) {
      const widthCanvas = window.innerWidth - WIDTH_MARGIN;
      const heightCanvas = window.innerHeight - HEIGHT_MARGIN;

      canvas.width = widthCanvas;
      canvas.height = heightCanvas;
      canvas.style.width = `${widthCanvas}px`;
      canvas.style.height = `${heightCanvas}px`;

      display = new Display(context, widthCanvas, heightCanvas, () =>
        dispatch(setGameStatus(GameStatus.End))
      );

      display.init();

      const render = () => {
        display.update();

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
  });

  return (
    <div className="gameWrapper">
      <canvas ref={canvasRef} />
    </div>
  );
};
