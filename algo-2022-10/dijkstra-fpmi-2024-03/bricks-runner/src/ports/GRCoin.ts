import { Point2D } from '@src/game/GameField';
import { Sprite, coin } from '@src/ports/GR.types';
import { putSprite } from '@src/ports/GR.lib';

export class GRCoin {
    constructor(
        private context: CanvasRenderingContext2D,
        private xy: Point2D,
        private pic: CanvasImageSource
    ) {}

    draw = () => {
        const sprite: Sprite = coin;
        putSprite(this.context, this.pic, sprite, this.xy.x, this.xy.y);
    };

    static create = (
        context: CanvasRenderingContext2D,
        xy: Point2D,
        pic: CanvasImageSource
    ): GRCoin => new GRCoin(context, xy, pic);
}
