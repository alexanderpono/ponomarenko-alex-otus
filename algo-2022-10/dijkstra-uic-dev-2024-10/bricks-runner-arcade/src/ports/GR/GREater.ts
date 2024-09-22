import { ManAni, Sprite } from './GR.types';
import { putSprite_ } from './GR.lib';
import { Point2D } from '@src/game/LevelMap';
import {
    eater,
    eaterD0,
    eaterD1,
    eaterL0,
    eaterL1,
    eaterR0,
    eaterR1,
    eaterU0,
    eaterU1
} from './GR.sprite';

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
            const frames = [eaterL0, eaterL1];
            sprite = frames[Math.floor((this.counter % 8) / 4)];
        }
        if (this.manAni === ManAni.UP) {
            const frames = [eaterU0, eaterU1];
            sprite = frames[Math.floor((this.counter % 8) / 4)];
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
