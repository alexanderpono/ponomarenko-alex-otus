export enum CellInfo {
    alive = 1,
    dead = 0,
}

export interface CellArray {
    width: number;
    height: number;
    data: CellInfo[];
}
