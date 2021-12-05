export interface CellInfo {
    id: string;
    visible: boolean;
}

export interface CellArray {
    width: number;
    height: number;
    data: CellInfo[];
}
