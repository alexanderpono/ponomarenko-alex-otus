import { Edge, Graph, UNDEFINED_COST } from './Graph';

export class GraphV4 extends Graph {
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
                const adjacentVertex = this.vertices[adjacentVertexIndex];
                verbose && console.log('adjacentVertex=', adjacentVertexIndex, adjacentVertex);
                if (adjacentVertex.processed) {
                    continue;
                }
                verticesToProcess.add(adjacentVertexIndex);
                const newAccessCost = curVertex.accessCost + adjacentEdge.cost.cost;
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

    static create(): GraphV4 {
        return new GraphV4();
    }
}
