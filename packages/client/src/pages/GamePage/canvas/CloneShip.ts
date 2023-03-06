import { Entity } from './Entity';

import cloneShipPic from 'assets/img/cel.png';
import bum1 from 'assets/img/bum1.png';
import bum2 from 'assets/img/bum2.png';
import bum3 from 'assets/img/bum3.png';
import bum4 from 'assets/img/bum4.png';
import bum5 from 'assets/img/bum5.png';
import bum6 from 'assets/img/bum6.png';

const explosions = [bum1, bum2, bum3, bum4, bum5, bum6];

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export class CloneShip extends Entity {
  pic = {};

  constructor(screenWidth: number) {
    super(getRandomArbitrary(0, screenWidth - 120), 0, 60, 40);
    const picLoad = new Image();
    picLoad.src = cloneShipPic;

    picLoad.onload = () => {
      this.pic = picLoad;

      return true;
    };
  }

  update() {
    super.update({ moveX: 0, moveY: 3 });
  }

  setUnVisible() {
    const picLoad = new Image();

    let frameIndex = 0;

    const interval = setInterval(() => {
      frameIndex++;
      if (frameIndex < 6) picLoad.src = explosions[frameIndex];

      picLoad.onload = () => {
        this.pic = picLoad;

        return true;
      };
    }, 100);

    setTimeout(() => {
      this.isVisible = false;
      clearInterval(interval);
    }, 600);
  }
}
