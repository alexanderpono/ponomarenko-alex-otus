import { AbstractGraph, UNDEFINED_COST, Vertex } from './Graph.types';
import { GraphCalculatorV2 } from './GraphCalculatorV2';

const V0V1 = 1;
const V1V0 = 2;

export class GraphCalculatorV3 extends GraphCalculatorV2 {
    protected updateAccessCostAndEdgeIndex = (
        graph: AbstractGraph,
        adjacentVertexIndex: number,
        curVertex: Vertex,
        edgeIndex: number
    ) => {
        const adjacentEdge = graph.edges[edgeIndex];
        const adjacentVertex = graph.vertices[adjacentVertexIndex];
        const direction = adjacentEdge.vertex0 === graph.curVertexIndex ? V0V1 : V1V0;
        const moveCost =
            direction === V0V1 ? adjacentEdge.cost.v0v1Cost : adjacentEdge.cost.v1v0Cost;
        const newAccessCost = curVertex.accessCost + moveCost;
        if (
            adjacentVertex.accessCost === UNDEFINED_COST ||
            newAccessCost < adjacentVertex.accessCost
        ) {
            adjacentVertex.accessCost = newAccessCost;
            adjacentVertex.edgeIndex = edgeIndex;
        }
    };
}
