import { Sprite, select } from './GR.types';
import { putSprite } from './GR.lib';
import { Point2D } from '@src/game/GameField';

export class GRSelect {
    constructor(
        private context: CanvasRenderingContext2D,
        private xy: Point2D,
        private pic: CanvasImageSource
    ) {}

    draw = () => {
        const sprite: Sprite = select;
        putSprite(this.context, this.pic, sprite, this.xy.x, this.xy.y);
    };

    static create = (
        context: CanvasRenderingContext2D,
        xy: Point2D,
        pic: CanvasImageSource
    ): GRSelect => new GRSelect(context, xy, pic);
}
