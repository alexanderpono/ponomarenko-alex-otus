import { LevelMap } from '@src/game/LevelMap';
import { EdgeCost, Grid, defaultGrid, defaultVertex } from './path.types';
import { COST_SPACE } from './PathCalculator';
import { CellToCost } from '@src/game/game.types';

export class GridFromMap {
    constructor(private cellToCost: CellToCost) {}

    gridFromMap = (field: LevelMap): Grid => {
        let graph = JSON.parse(JSON.stringify(defaultGrid));

        const h = field.field.length;
        const w = field.field[0].length;
        const verticesNumber = w * h;
        graph.vertices = Array(verticesNumber)
            .fill(defaultVertex)
            .map(() => ({ ...defaultVertex }));

        for (let y = 0; y < h; y++) {
            const vertexStartLine = y * w;
            for (let x = 0; x < w - 1; x++) {
                const vertexIndex = vertexStartLine + x;
                const cost = this.getEdgeCost(field, vertexIndex, vertexIndex + 1);
                graph.edges.push({
                    vertex0: vertexIndex,
                    vertex1: vertexIndex + 1,
                    cost
                });
            }
        }

        for (let y = 0; y < h - 1; y++) {
            const vertexStartLine = y * w;
            for (let x = 0; x < w; x++) {
                const vertexIndex = vertexStartLine + x;
                const cost = this.getEdgeCost(field, vertexIndex, vertexIndex + w);

                graph.edges.push({
                    vertex0: vertexIndex,
                    vertex1: vertexIndex + w,
                    cost
                });
            }
        }
        return graph;
    };

    getEdgeCost = (field: LevelMap, v0Index: number, v1Index: number): EdgeCost => {
        const v0xy = field.vertexIndexToCoords(v0Index);
        const v1xy = field.vertexIndexToCoords(v1Index);
        const cell0 = field.coordsToCell(v0xy);
        const cell1 = field.coordsToCell(v1xy);
        const result: EdgeCost = {
            cost: -1,
            v0v1Cost: COST_SPACE,
            v1v0Cost: COST_SPACE
        };

        result.cost = -1;
        result.v0v1Cost = this.cellToCost[cell1];
        result.v1v0Cost = this.cellToCost[cell0];
        if (typeof result.v0v1Cost === 'undefined') {
            console.error('cost not found for ', cell1);
        }
        if (typeof result.v1v0Cost === 'undefined') {
            console.error('cost not found for ', cell0);
        }
        if (cell0 === cell1) {
            result.cost = result.v0v1Cost;
        } else {
            result.cost = (result.v0v1Cost + result.v1v0Cost) / 2;
        }
        return result;
    };
}
