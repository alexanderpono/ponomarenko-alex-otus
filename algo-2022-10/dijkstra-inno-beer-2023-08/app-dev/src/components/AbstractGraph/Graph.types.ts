export interface AbstractGraph {
    edges: Edge[];
    vertices: Vertex[];
    cheapestPath: number[];
    curVertexIndex: number;
}

export interface Edge {
    vertex0: number;
    vertex1: number;
    cost: EdgeCost;
}

export interface Vertex {
    processed: boolean;
    accessCost: number;
    edgeIndex: number;
}

export interface EdgeCost {
    cost: number;
    v0v1Cost: number;
    v1v0Cost: number;
}
