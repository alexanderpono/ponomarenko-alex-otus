import { LevelMap } from '@src/game/LevelMap';
import { ImageBuilder } from '@src/ports/ImageBuilder';
import { Edge, Grid, UNDEFINED_COST } from '@src/path/path.types';
import { h2, SPRITE_HEIGHT, SPRITE_WIDTH, w2 } from './views.types';
import { MoveCost } from '@src/game/game.types';

export class EdgesView {
    render = (srcGraph: ImageBuilder, levelMap: LevelMap, grid: Grid): ImageBuilder => {
        let graph = srcGraph.lineWidth(1).lineColor('white');
        grid.edges.forEach((edge: Edge) => {
            graph = this.drawEdge(graph, edge, levelMap, grid);
        });

        return graph;
    };

    drawEdge = (srcGraph: ImageBuilder, edge: Edge, levelMap: LevelMap, grid: Grid) => {
        const w = levelMap.field[0].length;
        const v0x = edge.vertex0 % w;
        const v0y = Math.floor(edge.vertex0 / w);
        const v1x = edge.vertex1 % w;
        const v1y = Math.floor(edge.vertex1 / w);
        if (edge.cost.v0v1Cost !== UNDEFINED_COST) {
            const costToColor = {
                [MoveCost.road]: 'white',
                [MoveCost.grass]: 'blue',
                [MoveCost.forest]: 'yellow',
                [MoveCost.hill]: 'red',
                [MoveCost.stop]: 'black'
            };
            srcGraph.lineColor(costToColor[edge.cost.v0v1Cost]);
            const midX = w2 + ((v0x + v1x) / 2) * SPRITE_WIDTH;
            const midY = h2 + ((v0y + v1y) / 2) * SPRITE_HEIGHT;
            console.log(v0x, v0y, v1x, v1y);
            srcGraph.line(w2 + v0x * SPRITE_WIDTH, h2 + v0y * SPRITE_HEIGHT, midX, midY);
            srcGraph.lineColor(costToColor[edge.cost.v1v0Cost]);
            return srcGraph.line(midX, midY, w2 + v1x * SPRITE_WIDTH, h2 + v1y * SPRITE_HEIGHT);
        } else {
            srcGraph.lineColor('green');
            return srcGraph.line(
                w2 + v0x * SPRITE_WIDTH,
                h2 + v0y * SPRITE_HEIGHT,
                w2 + v1x * SPRITE_WIDTH,
                h2 + v1y * SPRITE_HEIGHT
            );
        }
    };
}
