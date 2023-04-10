import { Point2D } from '../GameField';
import { ManAni, Sprite, man, manL0, manR0 } from './GR.types';
import { putSprite } from './GR.lib';

export class GRMan {
    constructor(
        private context: CanvasRenderingContext2D,
        private manXY: Point2D,
        private manAni: ManAni,
        private pic: CanvasImageSource
    ) {}

    draw = () => {
        let sprite: Sprite = man;
        if (this.manAni === ManAni.RIGHT) {
            sprite = manR0;
        }
        if (this.manAni === ManAni.LEFT) {
            sprite = manL0;
        }
        putSprite(this.context, this.pic, sprite, this.manXY.x, this.manXY.y);
    };

    static create = (
        context: CanvasRenderingContext2D,
        manXY: Point2D,
        manAni: ManAni,
        pic: CanvasImageSource
    ): GRMan => new GRMan(context, manXY, manAni, pic);
}
