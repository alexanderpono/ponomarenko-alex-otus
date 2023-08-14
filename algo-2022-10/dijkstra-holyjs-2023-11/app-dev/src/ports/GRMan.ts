import { Point2D } from '../GameField';
import {
    ManAni,
    Sprite,
    man,
    manL0,
    manL1,
    manL2,
    manR0,
    manR1,
    manR2,
    manU0,
    manU1
} from './GR.types';
import { putSprite_ } from './GR.lib';

export class GRMan {
    constructor(
        private context: CanvasRenderingContext2D,
        private manXY: Point2D,
        private manAni: ManAni,
        private pic: CanvasImageSource,
        private counter: number
    ) {}

    draw = () => {
        let sprite: Sprite = man;
        if (this.manAni === ManAni.RIGHT) {
            const frames = [manR0, manR1, manR2];
            sprite = frames[this.counter % 3];
        }
        if (this.manAni === ManAni.LEFT) {
            const frames = [manL0, manL1, manL2];
            sprite = frames[this.counter % 3];
        }
        if (this.manAni === ManAni.STAIRS) {
            const frames = [manU0, manU1];
            sprite = frames[this.counter % 2];
        }
        putSprite_(this.context, this.pic, sprite, this.manXY.x, this.manXY.y);
    };

    static create = (
        context: CanvasRenderingContext2D,
        manXY: Point2D,
        manAni: ManAni,
        pic: CanvasImageSource,
        counter: number
    ): GRMan => new GRMan(context, manXY, manAni, pic, counter);
}
