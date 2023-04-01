const NULL = -1;
export const VERBOSE = true;
export const SILENT = false;

export interface Edge {
    vertex0: number;
    vertex1: number;
    cost: number;
}

interface Vertex {
    processed: boolean;
    accessCost: number;
    edgeIndex: number;
}
const UNDEFINED_COST = -1;
const UNDEFINED_INDEX = -1;
const defaultVertex: Vertex = {
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
        for (let i = 0; i < this.matrix.length; i++) {
            const line = this.matrix[i];
            for (let j = 0; j < line.length; j++) {
                const cost = line[j];
                if (cost === NULL) {
                    continue;
                }
                result.push({
                    vertex0: i,
                    vertex1: j,
                    cost
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

    calcVerticesCost = (fromVertex: number, toVertex: number, verbose: boolean) => {
        if (verbose) {
            console.log('calcVerticesCost() fromVertex=', fromVertex, 'toVertex=', toVertex);
        }

        this.vertices[fromVertex].accessCost = 0;

        let curVertexIndex = fromVertex;
        let n = 0;
        while (n < this.vertices.length) {
            const curVertex = this.vertices[curVertexIndex];
            this.vertices[curVertexIndex].processed = true;
            const edgesOfVertex = this.edges
                .map((edge: Edge, index: number) => (edge.vertex0 === curVertexIndex ? index : -1))
                .filter((index) => index !== -1);
            verbose && console.log(`\nedgesOfVertex ${curVertexIndex} =`, edgesOfVertex);
            for (let i = 0; i < edgesOfVertex.length; i++) {
                const edgeIndex = edgesOfVertex[i];
                const adjacentEdge = this.edges[edgeIndex];
                const adjacentVertex = this.vertices[adjacentEdge.vertex1];
                verbose && console.log('adjacentVertex=', adjacentEdge.vertex1, adjacentVertex);
                if (adjacentVertex.processed) {
                    continue;
                }
                const newAccessCost = curVertex.accessCost + adjacentEdge.cost;
                if (
                    adjacentVertex.accessCost === UNDEFINED_COST ||
                    newAccessCost < adjacentVertex.accessCost
                ) {
                    adjacentVertex.accessCost = newAccessCost;
                    adjacentVertex.edgeIndex = edgeIndex;
                }
            }
            let minAccessCost = Number.MAX_SAFE_INTEGER;
            let adjacentVertexWithMinCost = -1;
            for (let i = 0; i < edgesOfVertex.length; i++) {
                const edgeIndex = edgesOfVertex[i];
                const adjacentEdge = this.edges[edgeIndex];
                const adjacentVertex = this.vertices[adjacentEdge.vertex1];
                if (
                    adjacentVertex.processed === false &&
                    adjacentVertex.accessCost < minAccessCost
                ) {
                    minAccessCost = adjacentVertex.accessCost;
                    adjacentVertexWithMinCost = adjacentEdge.vertex1;
                }
            }
            verbose && this.printVertices(`vertices after step ${n}`);
            verbose && console.log('next vertex index = ', adjacentVertexWithMinCost);
            curVertexIndex = adjacentVertexWithMinCost;
            n++;
        }
        return this;
    };

    calcCheapestPath = (fromVertex: number, toVertex: number) => {
        let curVertexIndex = toVertex;
        const pathFromDestToSrc: number[] = [];
        const deadLoopProtection = 10;
        let stepNo = 0;
        while (curVertexIndex !== fromVertex && stepNo < deadLoopProtection) {
            const curVertex = this.vertices[curVertexIndex];
            pathFromDestToSrc.push(curVertex.edgeIndex);
            curVertexIndex = this.edges[curVertex.edgeIndex].vertex0;
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
            moveCost += edge.cost;
            console.log(`->${edge.vertex1}(edgeCost:${edge.cost}, moveCost:${moveCost})`);
        }
        console.log(`TO: ${toVertex}(accessCost: ${this.vertices[toVertex].accessCost})`);
        return '';
    };

    printEdges = () => {
        console.log('\nedges=\n[');
        this.edges.forEach((edge, index) => console.log('  ', index, edge));
        console.log(']');
        return '';
    };

    printVertices = (caption: string) => {
        console.log(`${caption} =\n[`);
        this.vertices.forEach((vertex, index) => console.log('  ', index, vertex));
        console.log(']');
        return '';
    };

    static create(): Graph {
        return new Graph();
    }
}
