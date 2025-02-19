import { LevelMap } from '@src/game/LevelMap';
import { ImageBuilder } from '@src/ports/ImageBuilder';
import { Grid } from '@src/path/path.types';
import { h2, SPRITE_HEIGHT, SPRITE_WIDTH, w2 } from './views.types';

export class CurVertexView {
    render = (srcGraph: ImageBuilder, levelMap: LevelMap, grid: Grid): ImageBuilder => {
        let graph = srcGraph;
        graph.lineColor('red').fillColor('white').lineWidth(5);
        const curVertex = levelMap.vertexIndexToCoords(grid.curVertexIndex);
        graph.drawCircle(w2 + curVertex.x * SPRITE_WIDTH, h2 + curVertex.y * SPRITE_HEIGHT, 8);

        return graph;
    };
}
