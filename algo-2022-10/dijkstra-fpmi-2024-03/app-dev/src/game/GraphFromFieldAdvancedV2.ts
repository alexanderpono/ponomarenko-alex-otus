import { EdgeCost } from '@src/game/Graph.types';
import { COST_SPACE, COST_WALL, defaultEdgeCost } from '@src/game/GraphCalculator';
import { Cell, GameField } from './GameField';
import { GraphFromField } from './GraphFromField';

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
            if (v0D === Cell.space) {
                result.v0v1Cost = COST_WALL;
            }
            if (v1D === Cell.space) {
                result.v1v0Cost = COST_WALL;
            }
            if (cell1 === Cell.wall || cell0 === Cell.wall) {
                result.v0v1Cost = COST_WALL;
                result.v1v0Cost = COST_WALL;
            }
        }

        if (egdeIsVertical && v0xy.y < v1xy.y) {
            if (cell0 === Cell.space && cell1 === Cell.space) {
                result.v1v0Cost = COST_WALL;
            }
            if (
                (cell0 === Cell.space || cell0 === Cell.stairs || cell0 === Cell.gold) &&
                cell1 === Cell.wall
            ) {
                result.v0v1Cost = COST_WALL;
                result.v1v0Cost = COST_WALL;
            }
            if (cell0 === Cell.wall && cell1 === Cell.space) {
                result.v0v1Cost = COST_WALL;
                result.v1v0Cost = COST_WALL;
            }
            if (cell0 === Cell.wall && cell1 === Cell.wall) {
                result.v0v1Cost = COST_WALL;
                result.v1v0Cost = COST_WALL;
            }
        }
        return result;
    };
}
