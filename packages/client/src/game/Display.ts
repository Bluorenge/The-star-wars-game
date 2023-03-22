import { MillenniumFalcon } from './MillenniumFalcon';
import { Bullet } from './Bullet';
import { CloneShip } from './CloneShip';

import {
  LOCAL_STORAGE_CURRENT_GAME_SCORE,
  LOCAL_STORAGE_PLAYER_BEST_GAME_SCORE,
} from 'constants/localStorage';
import { setGameStatus } from 'app/slices/gameSlice';
import { GameStatus } from 'constants/game';

export default class Display {
  public width = 0;
  public height = 0;
  private currentScore = 0;
  private bestScore = 0;

  private millenniumFalcon: MillenniumFalcon;
  private bullets: Array<Bullet> = [];
  private cloneShips: Array<CloneShip> = [];
  private reload = true;

  private interval: ReturnType<typeof setInterval> | undefined;

  private readonly _context: CanvasRenderingContext2D;
  private isPaused: boolean;
  private setGameInfo: any;

  constructor(
    context: CanvasRenderingContext2D,
    isPaused: boolean,
    setGameInfo: any
  ) {
    this._context = context;
    this.isPaused = isPaused;
    this.setGameInfo = setGameInfo;

    this.height = context.canvas.height;
    this.width = context.canvas.width;
    this.currentScore =
      Number(window.localStorage.getItem(LOCAL_STORAGE_CURRENT_GAME_SCORE)) ||
      0;
    this.bestScore =
      Number(
        window.localStorage.getItem(LOCAL_STORAGE_PLAYER_BEST_GAME_SCORE)
      ) || 0;

    this.millenniumFalcon = new MillenniumFalcon(this);
  }

  public get context() {
    return this._context;
  }

  private draw = () => {
    if (this.isPaused) {
      return;
    }

    this.context.clearRect(0, 0, this.width, this.height);

    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.width, this.height);

    this.millenniumFalcon.draw();

    this.drawHealthBar();
    this.drawScore();

    if (this.bullets.length > 0) {
      this.bullets = this.bullets.filter((bullet) => {
        if (bullet.isVisible) {
          this.context.fillStyle = 'red';
          this.context.fillRect(
            bullet.x,
            bullet.y,
            bullet.width,
            bullet.height
          );
          bullet.update();

          if (bullet.y > 0) {
            return true;
          }
        }
        bullet.clearSelf();

        return false;
      });
    }

    if (this.cloneShips.length > 0) {
      this.cloneShips = this.cloneShips.filter((cloneShip) => {
        if (cloneShip.isVisible) {
          cloneShip.draw();
          cloneShip.update();

          if (cloneShip.y < this.height) {
            return true;
          }
        }

        if (!cloneShip.isVisible) {
          this.currentScore++;
        }
        cloneShip.clearSelf();

        return false;
      });
    }
  };

  private drawHealthBar() {
    if (this.millenniumFalcon.health > 70) this.context.fillStyle = 'green';
    if (this.millenniumFalcon.health < 70) this.context.fillStyle = 'yellow';
    if (this.millenniumFalcon.health < 30) this.context.fillStyle = 'red';

    this.context.fillRect(10, 10, this.millenniumFalcon.health, 10);
  }

  private drawScore() {
    this.context.fillStyle = 'yellow';
    this.context.font = 'bold 46px Arial';
    this.context.fillText(String(this.currentScore), this.width - 50, 50);
  }

  private activeActions: { [index: string]: boolean } = {
    upUpdate: false,
    downUpdate: false,
    RRrightUpdate: false,
    leftUpdate: false,
    fireUpdate: false,
  };

  upUpdate = () => {
    if (this.millenniumFalcon.y > 50)
      this.millenniumFalcon.update({ moveX: 0, moveY: -10 });
  };

  downUpdate = () => {
    if (this.millenniumFalcon.y < this.height - 100)
      this.millenniumFalcon.update({ moveX: 0, moveY: 10 });
  };

  RRrightUpdate = () => {
    if (this.millenniumFalcon.x < this.width - 100)
      this.millenniumFalcon.update({ moveX: 10, moveY: 0 });
  };

  leftUpdate = () => {
    if (this.millenniumFalcon.x > 50)
      this.millenniumFalcon.update({ moveX: -10, moveY: 0 });
  };

  fireUpdate = () => {
    if (this.reload) {
      this.bullets.push(
        new Bullet(this.millenniumFalcon.x, this.millenniumFalcon.y)
      );
      this.reload = false;
    }
  };

  buttonDownHandler = (e: any) => {
    //UP
    if (e.keyCode === 38) {
      this.activeActions.upUpdate = true;
    }
    //DOWN
    if (e.keyCode === 40) {
      this.activeActions.downUpdate = true;
    }
    //LEFT
    if (e.keyCode === 37) {
      this.activeActions.leftUpdate = true;
    }
    //RIGHT
    if (e.keyCode === 39) {
      this.activeActions.RRrightUpdate = true;
    }

    //fire
    if (e.keyCode === 32) {
      this.activeActions.fireUpdate = true;
    }
  };

  buttonUpHandler = (e: any) => {
    //UP
    if (e.keyCode === 38) {
      this.activeActions.upUpdate = false;
    }
    //DOWN
    if (e.keyCode === 40) {
      this.activeActions.downUpdate = false;
    }
    //LEFT
    if (e.keyCode === 37) {
      this.activeActions.leftUpdate = false;
    }
    //RIGHT
    if (e.keyCode === 39) {
      this.activeActions.RRrightUpdate = false;
    }

    //fire
    if (e.keyCode === 32) {
      this.activeActions.fireUpdate = false;
    }
  };

  public init = () => {
    if (this.isPaused) {
      return;
    }

    this.interval = setInterval(() => {
      this.reload = true;
    }, 500);

    setInterval(() => {
      this.cloneShips.push(new CloneShip(this, this.width));
    }, 1000);
  };

  public updateState = () => {
    this.millenniumFalcon.updateShipInfo();

    window.localStorage.setItem(
      LOCAL_STORAGE_CURRENT_GAME_SCORE,
      String(this.currentScore)
    );
  };

  public update = () => {
    if (this.isPaused) {
      return;
    }

    Object.entries(this.activeActions).forEach(([key, value]) => {
      if (value && Object.keys(this).includes(key)) {
        if (
          key === 'upUpdate' ||
          key === 'downUpdate' ||
          key === 'RRrightUpdate' ||
          key === 'leftUpdate' ||
          key === 'fireUpdate'
        ) {
          this[key]();
        }
      }
    });

    if (this.millenniumFalcon.health > 0) {
      this.draw();
    } else {
      if (this.currentScore > this.bestScore) {
        this.bestScore = this.currentScore;
        window.localStorage.setItem('bestScore', String(this.bestScore));
      }

      setTimeout(() => {
        this.millenniumFalcon.clearSelf();
        this.setGameInfo(setGameStatus(GameStatus.End));
      }, 1000);
    }
  };
}
