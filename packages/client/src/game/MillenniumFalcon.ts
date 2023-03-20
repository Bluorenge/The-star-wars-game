import { Entity } from './Entity';
import Display from 'game/Display';

import ship from 'assets/img/socol1.png';

export class MillenniumFalcon extends Entity {
  private readonly pic: HTMLImageElement;
  private readonly context: CanvasRenderingContext2D;
  health = 100;

  constructor(context: Display) {
    super(200, 200, 100, 100);
    this.context = context.context;

    this.pic = new Image();
    this.pic.src = ship;
  }

  draw() {
    this.context.drawImage(this.pic, this.x, this.y, this.width, this.height);
  }

  setUnVisible() {
    this.health -= 1;
  }
}
