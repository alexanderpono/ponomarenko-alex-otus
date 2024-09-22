import { Sprite } from '@src/ports/GR/GR.types';
import { putSprite } from '@src/ports/GR/GR.lib';

import { Cell, LevelMap } from '@src/game/LevelMap';
import { UIState } from '@src/types/UIState';
import { pipe, space, stairs, wall } from './GR.sprite';

export class GRMap {
    constructor(
        private context: CanvasRenderingContext2D,
        private level: LevelMap,
        private pic: CanvasImageSource
    ) {}

    draw = (uiState: UIState) => {
        this.level.field.forEach((line: Cell[], y: number) => {
            line.forEach((cell: Cell, x: number) => {
                let sprite: Sprite = space;
                if (uiState.showMap && cell === Cell.wall) {
                    sprite = wall;
                }
                if (uiState.showMap && cell === Cell.stairs) {
                    sprite = stairs;
                }
                if (uiState.showMap && cell === Cell.pipe) {
                    sprite = pipe;
                }
                putSprite(this.context, this.pic, sprite, x, y);
            });
        });
    };

    static create = (
        context: CanvasRenderingContext2D,
        level: LevelMap,
        pic: CanvasImageSource
    ): GRMap => new GRMap(context, level, pic);
}
