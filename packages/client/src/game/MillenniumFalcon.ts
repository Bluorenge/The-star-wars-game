import { Entity } from './Entity';
import galaxy from './Galaxy';
import Display from 'game/Display';
import { setShipInfo } from 'app/slices/gameSlice';
import { store } from 'app/store';

import ship from 'assets/img/socol1.png';
import {
  LOCAL_STORAGE_PLAYER_SHIP_X_CORD,
  LOCAL_STORAGE_PLAYER_SHIP_Y_CORD,
  LOCAL_STORAGE_PLAYER_SHIP_HEALTH,
} from 'constants/localStorage';

export class MillenniumFalcon extends Entity {
  private readonly pic: HTMLImageElement;
  public health: number;

  private readonly context: CanvasRenderingContext2D;

  constructor(context: Display) {
    super(200, 200, 100, 100);

    this.context = context.context;

    this.x = store.getState().game.playerShip.xCord;
    this.y = store.getState().game.playerShip.yCord;
    this.health = store.getState().game.playerShip.health;

    this.pic = new Image();
    this.pic.src = ship;
  }

  public updateShipInfo() {
    store.dispatch(
      setShipInfo({
        xCord: this.x,
        yCord: this.y,
        health: this.health,
      })
    );
  }

  public clearSelf() {
    galaxy.clearSame(this);

    for (const key of Object.keys(window.localStorage)) {
      const isPlayerKey = [
        LOCAL_STORAGE_PLAYER_SHIP_X_CORD,
        LOCAL_STORAGE_PLAYER_SHIP_Y_CORD,
        LOCAL_STORAGE_PLAYER_SHIP_HEALTH,
      ].includes(key);

      if (isPlayerKey) {
        window.localStorage.removeItem(key);
      }
    }
  }

  public draw() {
    this.context.drawImage(this.pic, this.x, this.y, this.width, this.height);
  }

  setUnVisible() {
    this.health -= 1;
  }
}
