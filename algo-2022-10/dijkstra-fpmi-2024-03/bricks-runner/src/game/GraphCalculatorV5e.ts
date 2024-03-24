import { GameField, Point2D } from './GameField';
import { AbstractGraph } from './Graph.types';
import { ALL_NODES } from './GraphCalculator';
import { GraphCalculatorV5d } from './GraphCalculatorV5d';

export class GraphCalculatorV5e extends GraphCalculatorV5d {
    protected A: number;
    protected B: number;
    protected C: number;
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
        const v0 = this.gameField.vertexIndexToCoords(fromVertex, this.gameField.getWidth());
        const v1 = this.gameField.vertexIndexToCoords(toVertex, this.gameField.getWidth());
        this.A = this.getA(v0, v1);
        this.B = this.getB(v0, v1);
        this.C = this.getC(v0, v1);

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
        const d = this.getDistance(this.A, this.B, this.C, v0);
        return h * 2 + d;
    };

    protected getDistance = (A: number, B: number, C: number, v: Point2D) =>
        Math.abs(A * v.x + B * v.y + C) / Math.sqrt(A * A + B * B);

    protected getA = (v1: Point2D, v2: Point2D) => v2.y - v1.y;
    protected getB = (v1: Point2D, v2: Point2D) => v1.x - v2.x;
    protected getC = (v1: Point2D, v2: Point2D) => v1.x * (v1.y - v2.y) + v1.y * (v2.x - v1.x);
}
