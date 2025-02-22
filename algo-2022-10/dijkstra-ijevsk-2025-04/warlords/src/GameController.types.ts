import { Cell } from './game/LevelMap';

export interface Unit {
    x: number;
    y: number;
    id: Cell;
}

export const defaultUnit: Unit = {
    x: 0,
    y: 0,
    id: Cell.default
};
