import { LevelMap } from '@src/game/LevelMap';
import { ImageBuilder } from '@src/ports/ImageBuilder';
import { Edge, Grid } from '@src/path/path.types';
import { h2, SPRITE_HEIGHT, SPRITE_WIDTH, w2 } from './views.types';

export class PathView {
    render = (srcGraph: ImageBuilder, levelMap: LevelMap, grid: Grid): ImageBuilder => {
        let graph = srcGraph.lineWidth(6).lineColor('magenta');
        grid.cheapestPath.forEach((edgeIndex) => {
            this.drawPath(graph, grid.edges[edgeIndex], levelMap, grid);
        });

        return graph;
    };

    drawPath = (srcGraph: ImageBuilder, edge: Edge, levelMap: LevelMap, grid: Grid) => {
        const w = levelMap.field[0].length;
        const v0x = edge.vertex0 % w;
        const v0y = Math.floor(edge.vertex0 / w);
        const v1x = edge.vertex1 % w;
        const v1y = Math.floor(edge.vertex1 / w);

        return srcGraph.line(
            w2 + v0x * SPRITE_WIDTH,
            h2 + v0y * SPRITE_HEIGHT,
            w2 + v1x * SPRITE_WIDTH,
            h2 + v1y * SPRITE_HEIGHT
        );
    };
}
