import { Cell, GameField } from '@src/game/GameField';
import { Sprite, gold, man, space, stairs, wall } from '@src/ports/GR.types';
import { putSprite } from '@src/ports/GR.lib';
import { RenderOptions } from '@src/components/GameFieldUI';

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
