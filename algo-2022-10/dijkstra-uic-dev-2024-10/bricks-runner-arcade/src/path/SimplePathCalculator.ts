import { LevelMap, Point2D } from '@src/game/LevelMap';
import { Grid, Vertex } from './path.types';
import { MAX_PATH_LENGTH, PathCalculator } from './PathCalculator';

export class SimplePathCalculator extends PathCalculator {
    protected toVertex = -1;
    protected levelMap: LevelMap = null;
    protected A: number;
    protected B: number;
    protected C: number;

    protected calcCheapestPath = (graph: Grid, fromVertex: number, toVertex: number) => {
        const newGraph = { ...graph };
        let curVertexIndex = toVertex;
        const pathFromDestToSrc: number[] = [];
        const verticesFromDestToSrc: Vertex[] = [];
        const deadLoopProtection = MAX_PATH_LENGTH;
        let stepNo = 0;
        while (curVertexIndex !== fromVertex && stepNo < deadLoopProtection) {
            const curVertex = newGraph.vertices[curVertexIndex];
            pathFromDestToSrc.push(curVertex.edgeIndex);
            verticesFromDestToSrc.push(curVertex);
            const edge = newGraph.edges[curVertex.edgeIndex];
            curVertexIndex = edge.vertex0 === curVertexIndex ? edge.vertex1 : edge.vertex0;
            stepNo++;
        }

        newGraph.cheapestPath = pathFromDestToSrc.reverse();
        const verticesFromSrcToDest = verticesFromDestToSrc.reverse();
        const vertexIndexToStop = verticesFromSrcToDest.findIndex((v) => v.accessCost > 100);
        if (vertexIndexToStop >= 0) {
            newGraph.cheapestPath = newGraph.cheapestPath.slice(0, vertexIndexToStop);
        }
        return newGraph;
    };

    protected heuristic = (v0Index: number, targetIndex: number) => {
        const v0: Point2D = this.levelMap.vertexIndexToCoords(v0Index);
        const v1: Point2D = this.levelMap.vertexIndexToCoords(targetIndex);
        const h = Math.abs(v0.x - v1.x) + Math.abs(v0.y - v1.y);
        return h;
    };

    protected getNextVertex = (graph: Grid, verticesToProcess: number[]): number => {
        let minAccessCost = Number.MAX_SAFE_INTEGER;
        let minH = Number.MAX_SAFE_INTEGER;
        let minDY = Number.MAX_SAFE_INTEGER;
        let result = -1;
        verticesToProcess.forEach((nodeIndex) => {
            const vertex = graph.vertices[nodeIndex as number];
            const h = this.heuristic(nodeIndex, this.toVertex);

            const v0: Point2D = this.levelMap.vertexIndexToCoords(nodeIndex);
            const v1: Point2D = this.levelMap.vertexIndexToCoords(this.toVertex);
    
            const accessCost = vertex.accessCost;
            const dy = Math.abs(v0.y - v1.y);

            if (vertex.processed === false) {
                if (h < minH || h === minH && accessCost < minAccessCost) {
                    minAccessCost = accessCost;
                    minH = h;
                    minDY = dy;
                    result = nodeIndex as number;
                }
                if (h === minH && accessCost === minAccessCost) {
                    if (dy < minDY) {
                        minAccessCost = accessCost;
                        minH = h;
                        minDY = dy;
                        result = nodeIndex as number;
                    }
                }
            }
        });

        return result;
    };
}
