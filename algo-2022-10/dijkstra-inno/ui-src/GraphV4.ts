import { Graph } from './Graph';

export class GraphV4 extends Graph {
    getNextVertex = (verticesToProcess: number[]): number => {
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

    calcVerticesCost = (fromVertex: number, toVertex: number, verbose: boolean, maxStep = 2000) => {
        if (maxStep !== -1) {
            this.vertices[fromVertex].accessCost = 0;
            this.curVertexIndex = fromVertex;
        }
        let n = 0;
        const verticesToProcess = new Set<number>();
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
                verticesToProcess.add(adjacentVertexIndex);
                this.updateAccessCostAndEdgeIndex(adjacentVertex, curVertex, edgeIndex);
            }

            const nextVertex = this.getNextVertex([...verticesToProcess]);
            verbose && this.printVertices(`vertices after step ${n}`);
            verbose && console.log('next vertex index = ', nextVertex);
            this.curVertexIndex = nextVertex;
            if (this.curVertexIndex !== -1) {
                verticesToProcess.delete(this.curVertexIndex);
            }
            n++;
        }
        return this;
    };

    static create(): GraphV4 {
        return new GraphV4();
    }
}
