import {
    ManAni,
    Sprite,
    eater,
    eaterD0,
    eaterD1,
    eaterL,
    eaterR0,
    eaterR1,
    eaterU
} from './GR.types';
import { putSprite_ } from './GR.lib';
import { Point2D } from '@src/game/GameField';

export class GREater {
    constructor(
        private context: CanvasRenderingContext2D,
        private manXY: Point2D,
        private manAni: ManAni,
        private pic: CanvasImageSource,
        private counter: number
    ) {}

    draw = () => {
        let sprite: Sprite = eater;
        if (this.manAni === ManAni.RIGHT) {
            const frames = [eaterR0, eaterR1];
            sprite = frames[Math.floor((this.counter % 8) / 4)];
        }
        if (this.manAni === ManAni.LEFT) {
            const frames = [eaterL];
            sprite = frames[0];
        }
        if (this.manAni === ManAni.UP) {
            const frames = [eaterU];
            sprite = frames[0];
        }
        if (this.manAni === ManAni.DOWN) {
            const frames = [eaterD0, eaterD1];
            sprite = frames[Math.floor((this.counter % 8) / 4)];
        }
        putSprite_(this.context, this.pic, sprite, this.manXY.x, this.manXY.y);
    };

    static create = (
        context: CanvasRenderingContext2D,
        manXY: Point2D,
        manAni: ManAni,
        pic: CanvasImageSource,
        counter: number
    ): GREater => new GREater(context, manXY, manAni, pic, counter);
}
