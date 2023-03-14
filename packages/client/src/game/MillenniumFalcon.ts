import { Entity } from './Entity';

import ship from 'assets/img/socol1.png';

export class MillenniumFalcon extends Entity {
  pic = {};
  health = 100;

  constructor() {
    super(200, 200, 100, 100);

    const picLoad = new Image();
    picLoad.src = ship;
    picLoad.onload = () => {
      this.pic = picLoad;

      return true;
    };
  }

  setUnVisible() {
    this.health -= 1;
  }
}
