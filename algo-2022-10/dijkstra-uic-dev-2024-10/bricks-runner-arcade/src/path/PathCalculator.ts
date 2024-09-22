import { LevelMap, Point2D } from '@src/game/LevelMap';
import { Edge, Grid, UNDEFINED_COST, Vertex } from './path.types';

export const VERBOSE = true;
export const SILENT = false;
export const COST_WALL = 500;
export const COST_SPACE = 1;
export const ALL_NODES = 1000;
export const MAX_PATH_LENGTH = 400;

export class PathCalculator {
    protected toVertex = -1;
    protected levelMap: LevelMap = null;
    protected A: number;
    protected B: number;
    protected C: number;

    public calculateGraph = (
        graph: Grid,
        fromVertex: number,
        toVertex: number,
        verbose: boolean,
        maxStep: number,
        levelMap: LevelMap
    ) => {
        this.levelMap = levelMap;
        this.toVertex = toVertex;
        const v0 = this.levelMap.vertexIndexToCoords(fromVertex);
        const v1 = this.levelMap.vertexIndexToCoords(toVertex);
        this.A = this.getA(v0, v1);
        this.B = this.getB(v0, v1);
        this.C = this.getC(v0, v1);

        let newGraph = this.myCalcVerticesCost(graph, fromVertex, verbose, maxStep, toVertex);
        if (maxStep >= ALL_NODES) {
            newGraph = this.calcCheapestPath(newGraph, fromVertex, toVertex);
        }
        return newGraph;
    };

    protected myCalcVerticesCost = (
        graph: Grid,
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

    protected calcCheapestPath = (graph: Grid, fromVertex: number, toVertex: number) => {
        const newGraph = { ...graph };
        let curVertexIndex = toVertex;
        const pathFromDestToSrc: number[] = [];
        const deadLoopProtection = MAX_PATH_LENGTH;
        let stepNo = 0;
        while (curVertexIndex !== fromVertex && stepNo < deadLoopProtection) {
            const curVertex = newGraph.vertices[curVertexIndex];
            pathFromDestToSrc.push(curVertex.edgeIndex);
            const edge = newGraph.edges[curVertex.edgeIndex];
            curVertexIndex = edge.vertex0 === curVertexIndex ? edge.vertex1 : edge.vertex0;
            stepNo++;
        }

        newGraph.cheapestPath = pathFromDestToSrc.reverse();
        return newGraph;
    };

    protected heuristic = (v0Index: number, targetIndex: number) => {
        const v0: Point2D = this.levelMap.vertexIndexToCoords(v0Index);
        const v1: Point2D = this.levelMap.vertexIndexToCoords(targetIndex);
        const h = Math.abs(v0.x - v1.x) + Math.abs(v0.y - v1.y);
        const d = this.getDistance(this.A, this.B, this.C, v0);
        return 5 * (h * 4 + d);
    };

    protected getDistance = (A: number, B: number, C: number, v: Point2D) =>
        Math.abs(A * v.x + B * v.y + C) / Math.sqrt(A * A + B * B);

    protected getA = (v1: Point2D, v2: Point2D) => v2.y - v1.y;
    protected getB = (v1: Point2D, v2: Point2D) => v1.x - v2.x;
    protected getC = (v1: Point2D, v2: Point2D) => v1.x * (v1.y - v2.y) + v1.y * (v2.x - v1.x);

    protected updateAccessCostAndEdgeIndex = (
        graph: Grid,
        adjacentVertexIndex: number,
        curVertex: Vertex,
        edgeIndex: number
    ) => {
        const V0V1 = 1;
        const V1V0 = 2;

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

    protected getNextVertex = (graph: Grid, verticesToProcess: number[]): number => {
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

    protected getEdgesOfVertex = (graph: Grid): number[] => {
        const edgesOfVertex = graph.edges
            .map((edge: Edge, index: number) =>
                edge.vertex0 === graph.curVertexIndex || edge.vertex1 === graph.curVertexIndex
                    ? index
                    : -1
            )
            .filter((index) => index !== -1);
        return edgesOfVertex;
    };

    protected getAdjancedVertexIndex = (graph: Grid, edgeIndex: number): number => {
        const adjacentEdge = graph.edges[edgeIndex];
        const adjacentVertexIndex =
            adjacentEdge.vertex0 === graph.curVertexIndex
                ? adjacentEdge.vertex1
                : adjacentEdge.vertex0;
        return adjacentVertexIndex;
    };
}
