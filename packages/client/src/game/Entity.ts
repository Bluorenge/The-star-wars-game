import galaxy from './Galaxy';

export class Entity {
  public id = '';
  public isVisible = true;

  public x = 0;
  public y = 0;
  public width = 0;
  public height = 0;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  setUnVisible() {
    this.isVisible = false;
  }

  move(x: number, y: number) {
    this.y = this.y + y;
    this.x = this.x + x;
  }

  setSelf() {
    galaxy.setSame(this);
  }

  clearSelf() {
    galaxy.clearSame(this);
  }

  update({ moveX, moveY }: { moveX: number; moveY: number }) {
    this.clearSelf();
    this.move(moveX, moveY);
    this.setSelf();
  }
}
