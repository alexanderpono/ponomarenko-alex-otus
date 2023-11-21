import { Point2D } from './GameField';
import { AbstractGraph, UNDEFINED_COST, Vertex } from './Graph.types';
import { GraphCalculatorV5a } from './GraphCalculatorV5a';

export class GraphCalculatorV5b extends GraphCalculatorV5a {
    protected heuristic = (v0Index: number, v1Index: number) => {
        const v0: Point2D = this.gameField.vertexIndexToCoords(v0Index, this.gameField.getWidth());
        const v1: Point2D = this.gameField.vertexIndexToCoords(v1Index, this.gameField.getWidth());
        const h = Math.abs(v0.x - v1.x) + Math.abs(v0.y - v1.y);
        return h;
    };

    protected updateAccessCostAndEdgeIndex = (
        graph: AbstractGraph,
        adjacentVertexIndex: number,
        curVertex: Vertex,
        edgeIndex: number
    ) => {
        const adjacentEdge = graph.edges[edgeIndex];
        const adjacentVertex = graph.vertices[adjacentVertexIndex];
        const newAccessCost =
            curVertex.accessCost +
            adjacentEdge.cost.cost +
            100 * this.heuristic(adjacentVertexIndex, this.toVertex);
        if (
            adjacentVertex.accessCost === UNDEFINED_COST ||
            newAccessCost < adjacentVertex.accessCost
        ) {
            adjacentVertex.accessCost = newAccessCost;
            adjacentVertex.edgeIndex = edgeIndex;
        }
    };
}
