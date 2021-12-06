import { DEFAULT_CELL_STATE } from '@src/consts';
import { CellArray, CellInfo } from '@src/types';

export function createData(width: number, height: number): CellInfo[] {
    const cellsNumber = width * height;
    const startCellState = DEFAULT_CELL_STATE;
    const newData: CellInfo[] = [];
    for (let i = 0; i < cellsNumber; i++) {
        newData.push({ id: String(i), visible: startCellState });
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
    const startCellState = DEFAULT_CELL_STATE;
    const newData: CellInfo[] = [];
    for (let i = 0; i < cellsNumber; i++) {
        newData.push({ id: String(i), visible: startCellState });
    }

    const minWidth = oldWidth < width ? oldWidth : width;
    const minHeight = oldHeight < height ? oldHeight : height;

    for (let y = 0; y < minHeight; y++) {
        for (let x = 0; x < minWidth; x++) {
            const visibleVal = oldData[yx(y, x, oldWidth)].visible;
            newData[yx(y, x, width)].visible = visibleVal;
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
        data: srcAr.data.concat(),
    };

    const totalCells = ar.width * ar.height;
    let unprocessedCells = totalCells;
    let restAliveCells = Math.floor(unprocessedCells * probability);

    for (let i = 0; i < totalCells; i++) {
        let alive = false;
        if (restAliveCells / unprocessedCells > Math.random()) {
            alive = true;
            restAliveCells--;
        }
        ar.data[i].visible = alive;
        unprocessedCells--;
    }

    return ar;
};
