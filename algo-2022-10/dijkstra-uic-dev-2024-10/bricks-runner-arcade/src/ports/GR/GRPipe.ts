import { Sprite } from './GR.types';
import { putSprite } from './GR.lib';
import { Point2D } from '@src/game/LevelMap';
import { pipe } from './GR.sprite';

export class GRPipe {
    constructor(
        private context: CanvasRenderingContext2D,
        private xy: Point2D,
        private pic: CanvasImageSource
    ) {}

    draw = () => {
        const sprite: Sprite = pipe;
        putSprite(this.context, this.pic, sprite, this.xy.x, this.xy.y);
    };

    static create = (
        context: CanvasRenderingContext2D,
        xy: Point2D,
        pic: CanvasImageSource
    ): GRPipe => new GRPipe(context, xy, pic);
}
