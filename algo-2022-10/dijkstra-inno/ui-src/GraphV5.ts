import { GraphV4 } from './GraphV4';
import { Cell, GameField } from './GameField';
import { COST_SPACE, COST_WALL, EdgeCost, defaultVertex } from './Graph';
import { Edge, UNDEFINED_COST } from './Graph';

const V0V1 = 1;
const V1V0 = 2;
export class GraphV5 extends GraphV4 {
    initFromField = (field: GameField) => {
        const h = field.field.length;
        const w = field.field[0].length;
        const verticesNumber = w * h;
        this.vertices = Array(verticesNumber)
            .fill(defaultVertex)
            .map(() => ({ ...defaultVertex }));

        for (let y = 0; y < h; y++) {
            const vertexStartLine = y * w;
            for (let x = 0; x < w - 1; x++) {
                const vertexIndex = vertexStartLine + x;
                const cost = this.getEdgeCost(field, vertexIndex, vertexIndex + 1);
                this.edges.push({
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

                this.edges.push({
                    vertex0: vertexIndex,
                    vertex1: vertexIndex + w,
                    cost
                });
            }
        }
        return this;
    };

    getEdgeCost = (field: GameField, v0Index: number, v1Index: number): EdgeCost => {
        const w = field.field[0].length;
        const v0xy = field.vertexIndexToCoords(v0Index, w);
        const v1xy = field.vertexIndexToCoords(v1Index, w);
        const cell0 = field.coordsToCell(v0xy);
        const cell1 = field.coordsToCell(v1xy);
        const result: EdgeCost = {
            cost: -1,
            v0v1Cost: COST_SPACE,
            v1v0Cost: COST_SPACE
        };
        const egdeIsVertical = v0xy.x === v1xy.x;
        const egdeIsHor = v0xy.y === v1xy.y;
        result.cost = cell0 === Cell.wall || cell1 === Cell.wall ? COST_WALL : COST_SPACE;

        if (egdeIsHor && v0xy.x < v1xy.x) {
            const v0D = field.coordsToCell({ x: v0xy.x, y: v0xy.y + 1 });
            const v1D = field.coordsToCell({ x: v1xy.x, y: v1xy.y + 1 });
            if (v0D === Cell.space) {
                result.v0v1Cost = COST_WALL;
            }
            if (v1D === Cell.space) {
                result.v1v0Cost = COST_WALL;
            }
            if (cell1 === Cell.wall || cell0 === Cell.wall) {
                result.v0v1Cost = COST_WALL;
                result.v1v0Cost = COST_WALL;
            }
        }

        if (egdeIsVertical && v0xy.y < v1xy.y) {
            if (cell0 === Cell.space && cell1 === Cell.space) {
                result.v1v0Cost = COST_WALL;
            }
            if (
                (cell0 === Cell.space || cell0 === Cell.stairs || cell0 === Cell.gold) &&
                cell1 === Cell.wall
            ) {
                result.v0v1Cost = COST_WALL;
                result.v1v0Cost = COST_WALL;
            }
            if (cell0 === Cell.wall && cell1 === Cell.space) {
                result.v0v1Cost = COST_WALL;
                result.v1v0Cost = COST_WALL;
            }
            if (cell0 === Cell.wall && cell1 === Cell.wall) {
                result.v0v1Cost = COST_WALL;
                result.v1v0Cost = COST_WALL;
            }
        }
        return result;
    };

    calcVerticesCost = (fromVertex: number, toVertex: number, verbose: boolean) => {
        verbose && console.log('calcVerticesCost() fromVertex=', fromVertex, 'toVertex=', toVertex);

        this.vertices[fromVertex].accessCost = 0;

        let curVertexIndex = fromVertex;
        let n = 0;
        const verticesToProcess = new Set();
        while (n < this.vertices.length && curVertexIndex !== -1) {
            const curVertex = this.vertices[curVertexIndex];
            this.vertices[curVertexIndex].processed = true;
            const edgesOfVertex = this.edges
                .map((edge: Edge, index: number) =>
                    edge.vertex0 === curVertexIndex || edge.vertex1 === curVertexIndex ? index : -1
                )
                .filter((index) => index !== -1);
            verbose && console.log(`\nedgesOfVertex ${curVertexIndex} =`, edgesOfVertex);
            for (let i = 0; i < edgesOfVertex.length; i++) {
                const edgeIndex = edgesOfVertex[i];
                const adjacentEdge = this.edges[edgeIndex];
                const adjacentVertexIndex =
                    adjacentEdge.vertex0 === curVertexIndex
                        ? adjacentEdge.vertex1
                        : adjacentEdge.vertex0;
                const direction = adjacentEdge.vertex0 === curVertexIndex ? V0V1 : V1V0;
                const moveCost =
                    direction === V0V1 ? adjacentEdge.cost.v0v1Cost : adjacentEdge.cost.v1v0Cost;
                const adjacentVertex = this.vertices[adjacentVertexIndex];
                verbose && console.log('adjacentVertex=', adjacentVertexIndex, adjacentVertex);
                if (adjacentVertex.processed) {
                    continue;
                }
                verticesToProcess.add(adjacentVertexIndex);
                const newAccessCost = curVertex.accessCost + moveCost;
                if (
                    adjacentVertex.accessCost === UNDEFINED_COST ||
                    newAccessCost < adjacentVertex.accessCost
                ) {
                    adjacentVertex.accessCost = newAccessCost;
                    adjacentVertex.edgeIndex = edgeIndex;
                }
            }
            verbose && console.log('verticesToProcess=', verticesToProcess);

            const getNextVertex = (): number => {
                let minAccessCost = Number.MAX_SAFE_INTEGER;
                let result = -1;
                verticesToProcess.forEach((nodeIndex) => {
                    const vertex = this.vertices[nodeIndex as number];
                    if (vertex.processed === false && vertex.accessCost < minAccessCost) {
                        minAccessCost = vertex.accessCost;
                        result = nodeIndex as number;
                    }
                });
                return result;
            };
            const nextVertex = getNextVertex();
            verbose && this.printVertices(`vertices after step ${n}`);
            verbose && console.log('next vertex index = ', nextVertex);
            curVertexIndex = nextVertex;
            if (curVertexIndex !== -1) {
                verticesToProcess.delete(curVertexIndex);
            }
            n++;
        }
        return this;
    };

    static create(): GraphV5 {
        return new GraphV5();
    }
}
