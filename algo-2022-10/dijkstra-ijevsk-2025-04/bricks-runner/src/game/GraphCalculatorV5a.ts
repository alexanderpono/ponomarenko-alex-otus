import { GameField, Point2D } from './GameField';
import { AbstractGraph, UNDEFINED_COST, Vertex } from './Graph.types';
import { ALL_NODES } from './GraphCalculator';
import { GraphCalculatorV4 } from './GraphCalculatorV4';

export class GraphCalculatorV5a extends GraphCalculatorV4 {
    protected toVertex = -1;
    protected gameField: GameField = null;
    public calculateGraph = (
        graph: AbstractGraph,
        fromVertex: number,
        toVertex: number,
        verbose: boolean,
        maxStep: number,
        gameField: GameField
    ) => {
        this.gameField = gameField;
        this.toVertex = toVertex;
        let newGraph = this.myCalcVerticesCost(graph, fromVertex, verbose, maxStep, toVertex);
        if (maxStep >= ALL_NODES) {
            newGraph = this.calcCheapestPath(newGraph, fromVertex, toVertex);
        }
        return newGraph;
    };

    protected heuristic = (v0Index: number, targetIndex: number) => {
        const v0: Point2D = this.gameField.vertexIndexToCoords(v0Index, this.gameField.getWidth());
        const v1: Point2D = this.gameField.vertexIndexToCoords(
            targetIndex,
            this.gameField.getWidth()
        );
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
            this.heuristic(adjacentVertexIndex, this.toVertex);
        if (
            adjacentVertex.accessCost === UNDEFINED_COST ||
            newAccessCost < adjacentVertex.accessCost
        ) {
            adjacentVertex.accessCost = newAccessCost;
            adjacentVertex.edgeIndex = edgeIndex;
        }
    };
}
