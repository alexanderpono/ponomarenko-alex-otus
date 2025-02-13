import {
    AbstractGraph,
    EdgeCost,
    defaultAbstractGraph,
    defaultVertex
} from '@src/game/Graph.types';
import { defaultEdgeCost } from '@src/game/GraphCalculator';
import { Cell, GameField } from './GameField';

export class GraphFromField {
    graphFromField = (field: GameField): AbstractGraph => {
        let graph = JSON.parse(JSON.stringify(defaultAbstractGraph));

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

    getEdgeCost = (field: GameField, v0Index: number, v1Index: number): EdgeCost => ({
        ...defaultEdgeCost,
        cost: 1
    });
    getVertexIndex = (fieldString: string, char: string): number => {
        const s = fieldString.trim().split('\n').join('');
        return s.indexOf(char);
    };
}
