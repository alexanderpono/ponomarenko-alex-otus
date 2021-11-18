import { DEFAULT_CELL_STATE } from './playField.consts';
import { CellInfo } from './playField.types';

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
