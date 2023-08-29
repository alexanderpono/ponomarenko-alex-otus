export interface Vertex2D {
    x: number;
    y: number;
    letter: string;
    costDx: number;
    costDy: number;
}

export interface Edge2D {
    costDx: number;
    costDy: number;
}
