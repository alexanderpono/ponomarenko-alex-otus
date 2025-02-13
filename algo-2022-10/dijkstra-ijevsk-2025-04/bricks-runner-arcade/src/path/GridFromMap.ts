import { Cell, LevelMap } from '@src/game/LevelMap';
import { EdgeCost, Grid, defaultGrid, defaultVertex } from './path.types';
import { COST_SPACE, COST_WALL } from './PathCalculator';

const asEmpty = [Cell.space, Cell.coin, Cell.gold];
const passable = [Cell.space, Cell.coin, Cell.gold, Cell.stairs, Cell.man, Cell.pipe, Cell.guard];
const passableNotStairs = [Cell.space, Cell.coin, Cell.gold, Cell.man, Cell.pipe];

export class GridFromMap {
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
        const egdeIsVertical = v0xy.x === v1xy.x;
        const egdeIsHor = v0xy.y === v1xy.y;
        result.cost = cell0 === Cell.wall || cell1 === Cell.wall ? COST_WALL : COST_SPACE;

        if (egdeIsHor && v0xy.x < v1xy.x) {
            const v0D = field.coordsToCell({ x: v0xy.x, y: v0xy.y + 1 });
            const v1D = field.coordsToCell({ x: v1xy.x, y: v1xy.y + 1 });

            const isV0DEmpty = asEmpty.indexOf(v0D) >= 0;
            const isV1DEmpty = asEmpty.indexOf(v1D) >= 0;

            if (isV0DEmpty && cell0 !== Cell.pipe) {
                result.v0v1Cost = COST_WALL;
            }
            if (isV1DEmpty && cell1 !== Cell.pipe) {
                result.v1v0Cost = COST_WALL;
            }
            if (cell1 === Cell.wall || cell0 === Cell.wall) {
                result.v0v1Cost = COST_WALL;
                result.v1v0Cost = COST_WALL;
            }
        }

        if (egdeIsVertical && v0xy.y < v1xy.y) {
            const cell0Passable = passable.indexOf(cell0) >= 0;
            const cell1Passable = passable.indexOf(cell1) >= 0;
            const cell0PassableNotStairs = passableNotStairs.indexOf(cell0) >= 0;
            const cell1PassableNotStairs = passableNotStairs.indexOf(cell1) >= 0;
            if (cell1PassableNotStairs && cell0PassableNotStairs) {
                result.v1v0Cost = COST_WALL;
            }
            if (cell0Passable && cell1 === Cell.wall) {
                result.v0v1Cost = COST_WALL;
                result.v1v0Cost = COST_WALL;
            }
            if (cell0 === Cell.wall && cell1Passable) {
                result.v0v1Cost = COST_WALL;
                result.v1v0Cost = COST_WALL;
            }
            if (cell0 === Cell.wall && cell1 === Cell.wall) {
                result.v0v1Cost = COST_WALL;
                result.v1v0Cost = COST_WALL;
            }
            if (cell0 === Cell.stairs && cell1 != Cell.stairs) {
                result.v1v0Cost = COST_WALL;
            }
        }
        return result;
    };
}
