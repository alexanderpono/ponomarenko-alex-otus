import { Cell, GameField } from './GameField';

const NULL = -1;
export const VERBOSE = true;
export const SILENT = false;

export interface EdgeCost {
    cost: number;
    v0v1Cost: number;
    v1v0Cost: number;
}

export const UNDEFINED_COST = -1;
export const COST_WALL = 100;
export const COST_SPACE = 1;

export const defaultEdgeCost: EdgeCost = {
    cost: UNDEFINED_COST,
    v0v1Cost: UNDEFINED_COST,
    v1v0Cost: UNDEFINED_COST
};

export interface Edge {
    vertex0: number;
    vertex1: number;
    cost: EdgeCost;
}

interface Vertex {
    processed: boolean;
    accessCost: number;
    edgeIndex: number;
}
export interface RenderOptions {
    nodes: boolean;
    lines: boolean;
    path: boolean;
    nodesCost: boolean;
    map: boolean;
}
const UNDEFINED_INDEX = -1;
export const defaultVertex: Vertex = {
    processed: false,
    accessCost: UNDEFINED_COST,
    edgeIndex: UNDEFINED_INDEX
};
const getPairs = (chars: string[]): string[] => {
    const result: string[] = [];
    for (let i = 0; i < chars.length; i += 2) {
        const pair = `${chars[i]}${chars[i + 1]}`;
        result.push(pair);
    }
    return result;
};

export class Graph {
    matrix: number[][] = [];
    edges: Edge[] = [];
    adjacencyComponents: number[][] = [];
    skippedEdges: number[] = [];
    verticesNumber = 0;
    smallestSkeleton: number[] = [];
    vertices: Vertex[] = [];
    cheapestPath: number[] = [];
    curVertexIndex = 0;

    initFromAdjacencyString = (s: string) => {
        const trimmed = s.trim();
        const lines = trimmed.split('\n');
        const matrix: number[][] = lines.reduce(
            (result: number[][], line: string, index: number) => {
                if (index === 0) {
                    return result;
                }
                const chars = line.split('').slice(2);
                const pairs = getPairs(chars);
                const adjasentAndCosts = pairs.map((pair: string) => {
                    if (pair === '..') {
                        return NULL;
                    }
                    return parseInt(pair);
                });
                return [...result, adjasentAndCosts];
            },
            []
        );
        this.matrix = matrix;
        this.verticesNumber = matrix.length;
        return this;
    };

    getMatrix = () => this.matrix;

    calcEdges = () => {
        this.edges = this.getEdges_();
        return this;
    };

    getEdges_ = (): Edge[] => {
        const result: Edge[] = [];
        const edges = new Set();
        for (let i = 0; i < this.matrix.length; i++) {
            const line = this.matrix[i];
            for (let j = 0; j < line.length; j++) {
                const cost = line[j];
                if (cost === NULL) {
                    continue;
                }
                let minIndex = i;
                let maxIndex = j;
                if (i > j) {
                    minIndex = j;
                    maxIndex = i;
                }
                const edgeName = `${minIndex}-${maxIndex}`;
                if (edges.has(edgeName)) {
                    continue;
                }
                edges.add(edgeName);
                result.push({
                    vertex0: i,
                    vertex1: j,
                    cost: { ...defaultEdgeCost, cost }
                });
            }
        }

        return result;
    };

    calcVertices = () => {
        this.vertices = this.calcVertices_();
        return this;
    };

    calcVertices_ = (): Vertex[] => this.matrix.map(() => ({ ...defaultVertex }));

    getEdgesOfVertex = (): number[] => {
        const edgesOfVertex = this.edges
            .map((edge: Edge, index: number) =>
                edge.vertex0 === this.curVertexIndex || edge.vertex1 === this.curVertexIndex
                    ? index
                    : -1
            )
            .filter((index) => index !== -1);
        return edgesOfVertex;
    };

    getAdjancedVertexIndex = (edgeIndex: number): number => {
        const adjacentEdge = this.edges[edgeIndex];
        const adjacentVertexIndex =
            adjacentEdge.vertex0 === this.curVertexIndex
                ? adjacentEdge.vertex1
                : adjacentEdge.vertex0;
        return adjacentVertexIndex;
    };

    updateAccessCostAndEdgeIndex = (
        adjacentVertex: Vertex,
        curVertex: Vertex,
        edgeIndex: number
    ) => {
        const adjacentEdge = this.edges[edgeIndex];
        const newAccessCost = curVertex.accessCost + adjacentEdge.cost.cost;
        if (
            adjacentVertex.accessCost === UNDEFINED_COST ||
            newAccessCost < adjacentVertex.accessCost
        ) {
            adjacentVertex.accessCost = newAccessCost;
            adjacentVertex.edgeIndex = edgeIndex;
        }
    };

    getNextVertex = (edgesOfVertex: number[]): number => {
        let minAccessCost = Number.MAX_SAFE_INTEGER;
        let adjacentVertexWithMinCost = -1;
        for (let i = 0; i < edgesOfVertex.length; i++) {
            const edgeIndex = edgesOfVertex[i];
            const adjacentEdge = this.edges[edgeIndex];
            const adjacentVertexIndex =
                adjacentEdge.vertex0 === this.curVertexIndex
                    ? adjacentEdge.vertex1
                    : adjacentEdge.vertex0;
            const adjacentVertex = this.vertices[adjacentVertexIndex];
            if (adjacentVertex.processed === false && adjacentVertex.accessCost < minAccessCost) {
                minAccessCost = adjacentVertex.accessCost;
                adjacentVertexWithMinCost = adjacentVertexIndex;
            }
        }
        return adjacentVertexWithMinCost;
    };

    calcVerticesCost = (
        fromVertex: number,
        toVertex: number,
        verbose: boolean,
        maxStep: number
    ) => {
        if (maxStep !== -1) {
            this.vertices[fromVertex].accessCost = 0;
            this.curVertexIndex = fromVertex;
        }
        let n = 0;
        while (n < this.vertices.length && this.curVertexIndex !== -1 && n < maxStep) {
            const curVertex = this.vertices[this.curVertexIndex];
            this.vertices[this.curVertexIndex].processed = true;
            const edgesOfVertex = this.getEdgesOfVertex();
            for (let i = 0; i < edgesOfVertex.length; i++) {
                const edgeIndex = edgesOfVertex[i];
                const adjacentVertexIndex = this.getAdjancedVertexIndex(edgeIndex);
                const adjacentVertex = this.vertices[adjacentVertexIndex];
                if (adjacentVertex.processed) {
                    continue;
                }
                this.updateAccessCostAndEdgeIndex(adjacentVertex, curVertex, edgeIndex);
            }

            const nextVertex = this.getNextVertex(edgesOfVertex);
            verbose && this.printVertices(`vertices after step ${n}`);
            verbose && console.log('next vertex index = ', nextVertex);
            this.curVertexIndex = nextVertex;
            n++;
        }
        return this;
    };

    calcCheapestPath = (fromVertex: number, toVertex: number) => {
        let curVertexIndex = toVertex;
        const pathFromDestToSrc: number[] = [];
        const deadLoopProtection = 100;
        let stepNo = 0;
        while (curVertexIndex !== fromVertex && stepNo < deadLoopProtection) {
            const curVertex = this.vertices[curVertexIndex];
            pathFromDestToSrc.push(curVertex.edgeIndex);
            const edge = this.edges[curVertex.edgeIndex];
            curVertexIndex = edge.vertex0 === curVertexIndex ? edge.vertex1 : edge.vertex0;
            stepNo++;
        }

        this.cheapestPath = pathFromDestToSrc.reverse();
        return this;
    };

    printEdgesInCheapestPath = (fromVertex: number, toVertex: number) => {
        console.log(`\nprintEdgesInCheapestPath() \nfrom Vertex ${fromVertex} to ${toVertex}`);
        for (let i = 0; i < this.cheapestPath.length; i++) {
            console.log(`edge ${this.cheapestPath[i]}`, this.edges[this.cheapestPath[i]]);
        }
        console.log(`target Vertex ${toVertex}`, this.vertices[toVertex]);
        return '';
    };

    printPathFromTo = (fromVertex: number, toVertex: number) => {
        console.log(`\nFROM: ${fromVertex}(cost:0, goCost(0))`);
        let moveCost = 0;
        for (let i = this.cheapestPath.length - 1; i >= 0; i--) {
            const edge = this.edges[this.cheapestPath[i]];
            moveCost += edge.cost.cost;
            console.log(`->${edge.vertex1}(edgeCost:${edge.cost}, moveCost:${moveCost})`);
        }
        console.log(`TO: ${toVertex}(accessCost: ${this.vertices[toVertex].accessCost})`);
        return '';
    };

    printEdges = () => {
        console.log('\nedges=\n[');
        this.edges.forEach((edge, index) => console.log('  ', index, edge));
        console.log(']');
        return this;
    };

    printVertices = (caption: string) => {
        console.log(`${caption} =\n[`);
        this.vertices.forEach((vertex, index) => console.log('  ', index, vertex));
        console.log(']');
        return this;
    };

    initFromField = (
        field: GameField,
        getEdgeCost: (field: GameField, v0: number, v1: number) => number
    ) => {
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
                const cost = getEdgeCost(field, vertexIndex, vertexIndex + 1);
                this.edges.push({
                    vertex0: vertexIndex,
                    vertex1: vertexIndex + 1,
                    cost: { ...defaultEdgeCost, cost }
                });
            }
        }

        for (let y = 0; y < h - 1; y++) {
            const vertexStartLine = y * w;
            for (let x = 0; x < w; x++) {
                const vertexIndex = vertexStartLine + x;
                const cost = getEdgeCost(field, vertexIndex, vertexIndex + w);

                this.edges.push({
                    vertex0: vertexIndex,
                    vertex1: vertexIndex + w,
                    cost: { ...defaultEdgeCost, cost }
                });
            }
        }
        return this;
    };

    getVertexIndex = (fieldString: string, char: string): number => {
        const s = fieldString.trim().split('\n').join('');
        return s.indexOf(char);
    };

    getEdgeSimpleCost = (): number => 1;

    getEdgeAdvancedCost = (field: GameField, v0Index: number, v1Index: number): number => {
        const COST_WALL = 100;
        const COST_SPACE = 1;
        const w = field.field[0].length;
        const cell0 = field.coordsToCell(field.vertexIndexToCoords(v0Index, w));
        const cell1 = field.coordsToCell(field.vertexIndexToCoords(v1Index, w));
        const cost = cell0 === Cell.wall || cell1 === Cell.wall ? COST_WALL : COST_SPACE;
        return cost;
    };

    static create(): Graph {
        return new Graph();
    }
}
