import { Cell, GameField } from '@ui-src/GameField';
import { RenderOptions } from '@ui-src/Graph';
import { Sprite, gold, man, space, stairs, wall } from '@ui-src/GR/GR.types';
import { putSprite } from '@ui-src/GR/GR.lib';

export class GRField {
    constructor(
        private context: CanvasRenderingContext2D,
        private field: GameField,
        private pic: CanvasImageSource,
        private options: RenderOptions
    ) {}

    draw = () => {
        this.field.field.forEach((line: Cell[], y: number) => {
            line.forEach((cell: Cell, x: number) => {
                let sprite: Sprite = space;
                if (cell === Cell.wall && this.options.map) {
                    sprite = wall;
                }
                if (cell === Cell.stairs && this.options.map) {
                    sprite = stairs;
                }
                if (cell === Cell.man) {
                    sprite = man;
                }
                if (cell === Cell.gold) {
                    sprite = gold;
                }
                putSprite(this.context, this.pic, sprite, x, y);
            });
        });
    };

    static create = (
        context: CanvasRenderingContext2D,
        field: GameField,
        pic: CanvasImageSource,
        options: RenderOptions
    ): GRField => new GRField(context, field, pic, options);
}
