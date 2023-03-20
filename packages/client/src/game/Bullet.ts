import { Entity } from './Entity';

export class Bullet extends Entity {
  constructor(x: number, y: number) {
    super(x, y, 20, 20);
  }

  update() {
    super.update({ moveX: 0, moveY: -10 });
  }
}
