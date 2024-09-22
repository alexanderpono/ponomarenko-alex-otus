import { EdgeCost } from '@src/game/Graph.types';
import { defaultEdgeCost } from '@src/game/GraphCalculator';
import { Cell, GameField } from './GameField';
import { GraphFromField } from './GraphFromField';

export class GraphFromFieldAdvanced extends GraphFromField {
    getEdgeCost = (field: GameField, v0Index: number, v1Index: number): EdgeCost => {
        const COST_WALL = 100;
        const COST_SPACE = 1;
        const w = field.field[0].length;
        const cell0 = field.coordsToCell(field.vertexIndexToCoords(v0Index, w));
        const cell1 = field.coordsToCell(field.vertexIndexToCoords(v1Index, w));
        const cost = cell0 === Cell.wall || cell1 === Cell.wall ? COST_WALL : COST_SPACE;
        return { ...defaultEdgeCost, cost };
    };
}
