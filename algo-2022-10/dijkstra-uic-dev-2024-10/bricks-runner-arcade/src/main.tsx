import { GameController } from './GameController';
import { GameControllerBuilder } from './GameControllerBuilder';
import { PathCalculator } from './path/PathCalculator';
import { SimplePathCalculator } from './path/SimplePathCalculator';

console.log('main!');

const c = new GameController(
    new GameControllerBuilder()
    .setTarget('game4')
    .setCanvasW(800)
    .setCanvasH(400)
    .setCalculator(new PathCalculator())
    .setCanvasId('canvas4')
);
c.run();


const d = new GameController(
    new GameControllerBuilder()
    .setTarget('game5')
    .setCanvasId('canvas5')
    .setCanvasW(800)
    .setCanvasH(400)
    .setCalculator(new SimplePathCalculator())
);
d.run();
