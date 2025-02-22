import { Cell } from './LevelMap';

export enum MoveCost {
    road = 1,
    grass = 2,
    forest = 4,
    hill = 6,
    stop = 500
}

export type CellToCost = Partial<Record<Cell, MoveCost>>;

export const defaultCellToCost: CellToCost = {
    [Cell.road]: MoveCost.road,
    [Cell.town]: MoveCost.road,
    [Cell.grass]: MoveCost.grass,
    [Cell.forest]: MoveCost.forest,
    [Cell.hill]: MoveCost.hill,
    [Cell.largeBuilding]: MoveCost.grass,
    [Cell.water]: MoveCost.stop
};
