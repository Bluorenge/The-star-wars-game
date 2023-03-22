import { Entity } from './Entity';
import Display from 'game/Display';
import {
  LOCAL_STORAGE_PLAYER_SHIP_X_CORD,
  LOCAL_STORAGE_PLAYER_SHIP_Y_CORD,
  LOCAL_STORAGE_PLAYER_SHIP_HEALTH,
} from 'constants/localStorage';

import ship from 'assets/img/socol1.png';

export class MillenniumFalcon extends Entity {
  private readonly pic: HTMLImageElement;
  public health: number;

  private readonly context: CanvasRenderingContext2D;

  constructor(context: Display) {
    super(200, 200, 100, 100);

    this.context = context.context;

    this.x =
      Number(window.localStorage.getItem(LOCAL_STORAGE_PLAYER_SHIP_X_CORD)) ||
      0;
    this.y =
      Number(window.localStorage.getItem(LOCAL_STORAGE_PLAYER_SHIP_Y_CORD)) ||
      0;
    this.health =
      Number(window.localStorage.getItem(LOCAL_STORAGE_PLAYER_SHIP_HEALTH)) ||
      100;

    this.pic = new Image();
    this.pic.src = ship;
  }

  public draw() {
    this.context.drawImage(this.pic, this.x, this.y, this.width, this.height);
  }

  public updateShipInfo() {
    window.localStorage.setItem(
      LOCAL_STORAGE_PLAYER_SHIP_X_CORD,
      this.x.toString()
    );
    window.localStorage.setItem(
      LOCAL_STORAGE_PLAYER_SHIP_Y_CORD,
      this.y.toString()
    );
    window.localStorage.setItem(
      LOCAL_STORAGE_PLAYER_SHIP_HEALTH,
      this.health.toString()
    );
  }

  public clearShipInfo() {
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

  setUnVisible() {
    this.health -= 1;
  }
}
