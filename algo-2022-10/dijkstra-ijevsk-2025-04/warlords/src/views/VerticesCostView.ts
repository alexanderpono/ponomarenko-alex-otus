import { Cell, LevelMap } from '@src/game/LevelMap';
import { ImageBuilder } from '@src/ports/ImageBuilder';
import { Grid, UNDEFINED_COST, Vertex } from '@src/path/path.types';
import { h2, SPRITE_HEIGHT, SPRITE_WIDTH, w2, w4 } from './views.types';

export class VerticesCostView {
    render = (srcGraph: ImageBuilder, levelMap: LevelMap, grid: Grid): ImageBuilder => {
        let graph = srcGraph;
        graph.lineColor('green').fillColor('white').lineWidth(3).font('bold 15px sans-serif');
        levelMap.field.forEach((line: Cell[], y: number) => {
            line.forEach((cell: Cell, x: number) =>
                this.drawVertexCost(graph, levelMap, grid, x, y)
            );
        });

        return graph;
    };

    drawVertexCost = (
        graph: ImageBuilder,
        levelMap: LevelMap,
        grid: Grid,
        x: number,
        y: number
    ) => {
        const vertex = this.getVertexAt(levelMap, grid, x, y);
        // if (vertex.accessCost === UNDEFINED_COST) {
        //     return;
        // }
        return graph.text(x * SPRITE_WIDTH + w4, y * SPRITE_HEIGHT + h2, '' + vertex.accessCost);
    };

    getVertexAt = (levelMap: LevelMap, grid: Grid, x: number, y: number): Vertex => {
        const w = levelMap.field[0].length;
        const vIndex = y * w + x;
        const vertex = grid.vertices[vIndex];
        return vertex;
    };
}
