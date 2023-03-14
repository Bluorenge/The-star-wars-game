import { MutableRefObject, useEffect, useRef, useState } from 'react';

import Display from 'game/Display';

import './GamePage.scss';

export const GamePage = () => {
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;

  const [gameInfo, setGameInfo] = useState('');
  const [games, setGames] = useState(0);

  useEffect(() => {
    let canvas: HTMLCanvasElement;
    let interval: ReturnType<typeof setInterval>;

    let display: Display;

    const widthMargin = 20;
    const heightMargin = 80;
    const updateInterval = 20;

    if (canvasRef.current) {
      canvas = canvasRef.current;

      canvas.width = window.innerWidth - widthMargin;
      canvas.height = window.innerHeight - heightMargin;
      canvas.style.width = `${window.innerWidth - widthMargin}px`;
      canvas.style.height = `${window.innerHeight - heightMargin}px`;

      display = new Display(
        window.innerWidth - widthMargin,
        window.innerHeight - heightMargin,
        setGameInfo
      );
      display.context = canvas.getContext('2d');
      display.setGameInfo = setGameInfo;

      display.init();
      interval = setInterval(() => display.update(), updateInterval);
      window.addEventListener('keydown', display.buttonDownHandler);
      window.addEventListener('keyup', display.buttonUpHandler);
    }
    return () => {
      window.removeEventListener('keydown', display.buttonDownHandler);
      window.removeEventListener('keyup', display.buttonUpHandler);
      clearInterval(interval);
    };
  }, [games]);

  return (
    <div className="gameWrapper">
      <p className="gameWrapper__gamesCount">Игр сыграно: {games}</p>
      <canvas ref={canvasRef} />
      {gameInfo === 'end' && (
        <button
          className="gameWrapper__newGame"
          onClick={() => {
            setGames(games + 1);
            setGameInfo('');
          }}
        >
          NewGame
        </button>
      )}
    </div>
  );
};
