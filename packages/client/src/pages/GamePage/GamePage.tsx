import React, { useEffect, useRef, useState } from 'react';

import Display from './canvas';

import './GamePage.scss';

export const GamePage = () => {
  const ref = useRef<any>();

  const [gameInfo, setGameInfo] = useState('');
  const [games, setGames] = useState(0);

  useEffect(() => {
    const canvas: HTMLCanvasElement = ref.current;
    let interval: any;
    let display: any;

    if (canvas) {
      canvas.width = window.innerWidth - 20;
      canvas.height = window.innerHeight - 80;
      canvas.style.width = `${window.innerWidth - 20}px`;
      canvas.style.height = `${window.innerHeight - 80}px`;

      display = new Display(
        window.innerWidth - 20,
        window.innerHeight - 80,
        setGameInfo
      );
      display.context = canvas.getContext('2d');
      display.setGameInfo = setGameInfo;

      display.init();
      interval = setInterval(() => display.update(), 20);
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
    <div className="game-wrapper">
      <p>Игр сыграно: {games}</p>
      <canvas ref={ref} />
      {gameInfo === 'end' && (
        <button
          style={{ display: 'block' }}
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
