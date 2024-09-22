import { GameController } from './GameController';
import { GameControllerBuilder } from './GameControllerBuilder';
import { PathCalculator } from './path/PathCalculator';
import { SimplePathCalculator } from './path/SimplePathCalculator';
import { level1 } from './ports/levels/level1';
import { level2 } from './ports/levels/level2';

console.log('main!');

const c = new GameController(
    new GameControllerBuilder()
    .setTarget('game4')
    .setCanvasW(720)
    .setCanvasH(320)
    .setCalculator(new PathCalculator())
    .setCanvasId('canvas4')
    .setLevel(level1)
);
c.run();


const d = new GameController(
    new GameControllerBuilder()
    .setTarget('game5')
    .setCanvasId('canvas5')
    .setCanvasW(720)
    .setCanvasH(320)
    .setCalculator(new SimplePathCalculator())
    .setLevel(level2)
);
d.run();
