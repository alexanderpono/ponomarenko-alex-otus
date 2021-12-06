import { DEFAULT_CELL_STATE } from '@src/consts';
import { CellArray, CellInfo } from '@src/types';

export function createData(width: number, height: number): CellInfo[] {
    const cellsNumber = width * height;
    const newData: CellInfo[] = [];
    for (let i = 0; i < cellsNumber; i++) {
        newData.push(DEFAULT_CELL_STATE);
    }
    return newData;
}

export function recreateData(
    oldData: CellInfo[],
    oldWidth: number,
    oldHeight: number,
    width: number,
    height: number
): CellInfo[] {
    const cellsNumber = width * height;
    const newData: CellInfo[] = [];
    for (let i = 0; i < cellsNumber; i++) {
        newData.push(DEFAULT_CELL_STATE);
    }

    const minWidth = oldWidth < width ? oldWidth : width;
    const minHeight = oldHeight < height ? oldHeight : height;

    for (let y = 0; y < minHeight; y++) {
        for (let x = 0; x < minWidth; x++) {
            const visibleVal = oldData[yx(y, x, oldWidth)];
            newData[yx(y, x, width)] = visibleVal;
        }
    }
    return newData;
}

export const yx = (y: number, x: number, width: number) => y * width + x;

export const randomFill = (srcAr: CellArray, probability: number): CellArray => {
    if (probability < 0 || probability > 1) {
        throw new Error('Probability must be between 0 and 1');
    }

    const ar = {
        ...srcAr,
        data: createData(srcAr.width, srcAr.height),
    };

    const totalCells = ar.width * ar.height;
    let unprocessedCells = totalCells;
    let restAliveCells = Math.floor(unprocessedCells * probability);
    for (let i = 0; i < totalCells; i++) {
        let alive = CellInfo.dead;
        if (restAliveCells > 0 && restAliveCells / unprocessedCells > Math.random()) {
            alive = CellInfo.alive;
            restAliveCells--;
        }
        ar.data[i] = alive;
        unprocessedCells--;
    }

    return ar;
};

export const getInverted = (cell: CellInfo): CellInfo =>
    cell === CellInfo.alive ? CellInfo.dead : CellInfo.alive;
