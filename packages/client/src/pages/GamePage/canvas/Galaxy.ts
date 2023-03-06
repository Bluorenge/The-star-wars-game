import { Entity } from './Entity';

class Galaxy {
  pole: any[] = [];

  constructor(x: number, y: number) {
    for (let i = 0; i < x; i++) {
      const stroke = [];
      for (let j = 0; j < y; j++) {
        stroke.push(0);
      }
      this.pole.push(stroke);
    }
  }

  clearSame(etinity: Entity) {
    for (let i = 0; i < etinity?.width / 20; i++) {
      for (let j = 0; j < etinity?.height / 20; j++) {
        const ii = Math.floor(etinity?.x / 20 + i);
        const jj = Math.floor(etinity?.y / 20 + j);

        this.pole[jj][ii] = 0;
      }
    }
  }

  setSame(etinity: Entity) {
    for (let i = 0; i < etinity?.width / 20; i++) {
      for (let j = 0; j < etinity?.height / 20; j++) {
        const ii = Math.floor(etinity?.x / 20 + i);
        const jj = Math.floor(etinity?.y / 20 + j);
        if (this.pole?.[jj]?.[ii] === 0) this.pole[jj][ii] = etinity;
        else {
          this.pole[jj][ii] && this.pole[jj][ii]?.setUnVisible();
          etinity?.setUnVisible();
        }
      }
    }
  }
}

export default new Galaxy(
  (Number(window.innerWidth) - 20) / 20,
  (Number(window.innerHeight) - 20) / 20
);
