import { LevelMap } from '@src/game/LevelMap';
import { ImageBuilder } from '@src/ports/ImageBuilder';
import { Edge, Grid } from '@src/path/path.types';
import { h2, SPRITE_HEIGHT, SPRITE_WIDTH, w2, w4 } from './views.types';

export class EdgesCostView {
    render = (srcGraph: ImageBuilder, levelMap: LevelMap, grid: Grid): ImageBuilder => {
        let graph = srcGraph
            .lineColor('green')
            .fillColor('white')
            .lineWidth(3)
            .font('bold 15px sans-serif');

        grid.edges.forEach((edge: Edge) => {
            graph = this.drawEdgeCost(graph, edge, levelMap, grid);
        });

        return graph;
    };

    drawEdgeCost = (graph: ImageBuilder, edge: Edge, levelMap: LevelMap, grid: Grid) => {
        const w = levelMap.field[0].length;
        const v0x = edge.vertex0 % w;
        const v0y = Math.floor(edge.vertex0 / w);
        const v1x = edge.vertex1 % w;
        const v1y = Math.floor(edge.vertex1 / w);
        if (v0y === v1y) {
            return graph.text(
                w4 + 3 + ((v0x + v1x) / 2) * SPRITE_WIDTH,
                h2 - 2 + ((v0y + v1y) / 2) * SPRITE_HEIGHT,
                '' + edge.cost.cost
            );
        } else {
            return graph.text(
                w2 + ((v0x + v1x) / 2) * SPRITE_WIDTH,
                h2 + 3 + ((v0y + v1y) / 2) * SPRITE_HEIGHT,
                '' + edge.cost.cost
            );
        }
    };
}
