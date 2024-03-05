import { EdgeCost } from '@src/game/Graph.types';
import { COST_SPACE, COST_WALL } from '@src/game/GraphCalculator';
import { Cell, GameField } from './GameField';
import { GraphFromField } from './GraphFromField';
const asEmpty = [Cell.space, Cell.coin, Cell.gold];
const passable = [Cell.space, Cell.coin, Cell.gold, Cell.stairs, Cell.man];
const passableNotStairs = [Cell.space, Cell.coin, Cell.gold, Cell.man];

export class GraphFromFieldAdvancedV2 extends GraphFromField {
    getEdgeCost = (field: GameField, v0Index: number, v1Index: number): EdgeCost => {
        const w = field.field[0].length;
        const v0xy = field.vertexIndexToCoords(v0Index, w);
        const v1xy = field.vertexIndexToCoords(v1Index, w);
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

            if (isV0DEmpty) {
                result.v0v1Cost = COST_WALL;
            }
            if (isV1DEmpty) {
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
