import { Sprite, gold } from './GR.types';
import { putSprite } from './GR.lib';
import { Point2D } from '@src/game/GameField';

export class GRGold {
    constructor(
        private context: CanvasRenderingContext2D,
        private xy: Point2D,
        private pic: CanvasImageSource
    ) {}

    draw = () => {
        const sprite: Sprite = gold;
        putSprite(this.context, this.pic, sprite, this.xy.x, this.xy.y);
    };

    static create = (
        context: CanvasRenderingContext2D,
        xy: Point2D,
        pic: CanvasImageSource
    ): GRGold => new GRGold(context, xy, pic);
}
