import { AbstractGraph, defaultAbstractGraph, defaultVertex } from '@src/game/Graph.types';
import { defaultEdgeCost } from '@src/game/GraphCalculator';
import { GameField } from './GameField';

export class GraphFromField {
    graphFromField = (
        field: GameField,
        getEdgeCost: (field: GameField, v0: number, v1: number) => number
    ): AbstractGraph => {
        let graph = {
            ...defaultAbstractGraph
        };

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
                const cost = getEdgeCost(field, vertexIndex, vertexIndex + 1);
                graph.edges.push({
                    vertex0: vertexIndex,
                    vertex1: vertexIndex + 1,
                    cost: { ...defaultEdgeCost, cost }
                });
            }
        }

        for (let y = 0; y < h - 1; y++) {
            const vertexStartLine = y * w;
            for (let x = 0; x < w; x++) {
                const vertexIndex = vertexStartLine + x;
                const cost = getEdgeCost(field, vertexIndex, vertexIndex + w);

                graph.edges.push({
                    vertex0: vertexIndex,
                    vertex1: vertexIndex + w,
                    cost: { ...defaultEdgeCost, cost }
                });
            }
        }
        return graph;
    };
}
