import { AbstractGraph, UNDEFINED_COST, Vertex } from './Graph.types';
import { GraphCalculatorV5a } from './GraphCalculatorV5a';

export class GraphCalculatorV5c extends GraphCalculatorV5a {
    protected updateAccessCostAndEdgeIndex = (
        graph: AbstractGraph,
        adjacentVertexIndex: number,
        curVertex: Vertex,
        edgeIndex: number
    ) => {
        const adjacentEdge = graph.edges[edgeIndex];
        const adjacentVertex = graph.vertices[adjacentVertexIndex];
        const newAccessCost = curVertex.accessCost + adjacentEdge.cost.cost;
        if (
            adjacentVertex.accessCost === UNDEFINED_COST ||
            newAccessCost < adjacentVertex.accessCost
        ) {
            adjacentVertex.accessCost = newAccessCost;
            adjacentVertex.edgeIndex = edgeIndex;
        }
    };

    protected getNextVertex = (graph: AbstractGraph, verticesToProcess: number[]): number => {
        let minAccessCost = Number.MAX_SAFE_INTEGER;
        let result = -1;
        verticesToProcess.forEach((nodeIndex) => {
            const vertex = graph.vertices[nodeIndex as number];
            const h = this.heuristic(nodeIndex, this.toVertex);
            if (vertex.processed === false && vertex.accessCost + h < minAccessCost) {
                minAccessCost = vertex.accessCost + h;
                result = nodeIndex as number;
            }
        });

        return result;
    };
}
