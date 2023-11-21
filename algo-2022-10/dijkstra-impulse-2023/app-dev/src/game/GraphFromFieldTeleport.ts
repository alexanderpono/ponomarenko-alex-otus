import {
    AbstractGraph,
    EdgeCost,
    defaultAbstractGraph,
    defaultVertex
} from '@src/game/Graph.types';
import { defaultEdgeCost } from '@src/game/GraphCalculator';
import { Cell, GameField, Point2D } from './GameField';
import { GraphFromFieldAdvanced } from './GraphFromFieldAdvanced';

export class GraphFromFieldTeleport extends GraphFromFieldAdvanced {
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

        console.log('V3');
        const teleport: Point2D[] = [];
        const teleportVI: number[] = [];

        for (let y = 0; y < h - 1; y++) {
            const vertexStartLine = y * w;
            for (let x = 0; x < w; x++) {
                const vertexIndex = vertexStartLine + x;

                const cell = field.coordsToCell(field.vertexIndexToCoords(vertexIndex, w));
                if (cell === Cell.teleport) {
                    const point = field.vertexIndexToCoords(vertexIndex, w);
                    teleport.push(point);
                    teleportVI.push(vertexIndex);
                }
            }
        }

        if (teleport.length === 2) {
            const v0 = teleportVI[0];
            const v1 = teleportVI[1];
            const cost = {
                ...defaultEdgeCost,
                cost: 1
            };
            graph.edges.push({
                vertex0: v0,
                vertex1: v1,
                cost
            });
        }
        return graph;
    };
}
