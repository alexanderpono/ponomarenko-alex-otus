export interface Grid {
    edges: Edge[];
    vertices: Vertex[];
    cheapestPath: number[];
    curVertexIndex: number;
}
export const defaultGrid: Grid = {
    edges: [],
    vertices: [],
    cheapestPath: [],
    curVertexIndex: -1
};

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

const UNDEFINED_INDEX = -1;
export const UNDEFINED_COST = -1;
export const defaultVertex: Vertex = {
    processed: false,
    accessCost: UNDEFINED_COST,
    edgeIndex: UNDEFINED_INDEX
};

export interface EdgeCost {
    cost: number;
    v0v1Cost: number;
    v1v0Cost: number;
}
