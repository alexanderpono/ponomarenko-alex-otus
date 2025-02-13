import { GameField } from './GameField';
import { AbstractGraph } from './Graph.types';
import { ALL_NODES } from './GraphCalculator';
import { GraphCalculatorV2 } from './GraphCalculatorV2';

export class GraphCalculatorV4 extends GraphCalculatorV2 {
    public calculateGraph = (
        graph: AbstractGraph,
        fromVertex: number,
        toVertex: number,
        verbose: boolean,
        maxStep: number,
        gameField: GameField
    ) => {
        let newGraph = this.myCalcVerticesCost(graph, fromVertex, verbose, maxStep, toVertex);
        if (maxStep >= ALL_NODES) {
            newGraph = this.calcCheapestPath(newGraph, fromVertex, toVertex);
        }
        return newGraph;
    };

    protected myCalcVerticesCost = (
        graph: AbstractGraph,
        fromVertex: number,
        verbose: boolean,
        maxStep: number,
        toVertex: number
    ) => {
        const newGraph = { ...graph };
        if (maxStep !== -1) {
            newGraph.vertices[fromVertex].accessCost = 0;
            newGraph.curVertexIndex = fromVertex;
        }
        let n = 0;
        const verticesToProcess = new Set<number>();
        while (n < newGraph.vertices.length && newGraph.curVertexIndex !== -1 && n < maxStep) {
            if (newGraph.curVertexIndex === toVertex) {
                return newGraph;
            }

            const curVertex = newGraph.vertices[newGraph.curVertexIndex];
            newGraph.vertices[newGraph.curVertexIndex].processed = true;
            const edgesOfVertex = this.getEdgesOfVertex(newGraph);
            for (let i = 0; i < edgesOfVertex.length; i++) {
                const edgeIndex = edgesOfVertex[i];
                const adjacentVertexIndex = this.getAdjancedVertexIndex(newGraph, edgeIndex);
                const adjacentVertex = newGraph.vertices[adjacentVertexIndex];
                if (adjacentVertex.processed) {
                    continue;
                }
                verticesToProcess.add(adjacentVertexIndex);
                this.updateAccessCostAndEdgeIndex(
                    newGraph,
                    adjacentVertexIndex,
                    curVertex,
                    edgeIndex
                );
            }

            const nextVertex = this.getNextVertex(newGraph, [...verticesToProcess]);
            verbose && console.log('next vertex index = ', nextVertex);
            newGraph.curVertexIndex = nextVertex;
            if (newGraph.curVertexIndex !== -1) {
                verticesToProcess.delete(newGraph.curVertexIndex);
            }
            n++;
        }
        return newGraph;
    };
}
