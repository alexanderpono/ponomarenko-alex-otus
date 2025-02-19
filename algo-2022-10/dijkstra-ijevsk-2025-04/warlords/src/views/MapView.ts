import { Cell, LevelMap } from '@src/game/LevelMap';
import { ImageBuilder } from '@src/ports/ImageBuilder';
import { getSpriteXY } from './getSpriteXY';

export class MapView {
    render = (srcGraph: ImageBuilder, levelMap: LevelMap): ImageBuilder => {
        let graph = srcGraph;
        levelMap.field.forEach((line: Cell[], y: number) => {
            line.forEach((cell: Cell, x: number) => {
                const sprite = getSpriteXY(levelMap, x, y, cell);
                graph = graph.drawSprite('sprite', sprite.x, sprite.y, x * 40, y * 40, 40, 40);
            });
        });

        return graph;
    };
}
