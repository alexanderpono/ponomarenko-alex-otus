import { Cell, LevelMap } from '@src/game/LevelMap';
import { ImageBuilder } from '@src/ports/ImageBuilder';
import { Grid } from '@src/path/path.types';
import { h2, SPRITE_HEIGHT, SPRITE_WIDTH, w2 } from './views.types';

export class VerticesView {
    render = (srcGraph: ImageBuilder, levelMap: LevelMap, grid: Grid): ImageBuilder => {
        let graph = srcGraph;
        graph.lineColor('green').fillColor('white').lineWidth(2);
        levelMap.field.forEach((line: Cell[], y: number) => {
            line.forEach((cell: Cell, x: number) => this.drawVertex(x, y, graph));
        });

        return graph;
    };

    drawVertex = (x: number, y: number, graph: ImageBuilder) =>
        graph.drawCircle(w2 + x * SPRITE_WIDTH, h2 + y * SPRITE_HEIGHT, 6);
}
