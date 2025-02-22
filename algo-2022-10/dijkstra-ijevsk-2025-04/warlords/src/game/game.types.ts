import { Cell } from './LevelMap';

export enum HeroMoveCost {
    road = 1,
    grass = 2,
    forest = 4,
    hill = 6,
    stop = 500
}

export type CellToCost = Partial<Record<Cell, number>>;

export const defaultCellToCost: CellToCost = {
    [Cell.road]: HeroMoveCost.road,
    [Cell.town]: HeroMoveCost.road,
    [Cell.grass]: HeroMoveCost.grass,
    [Cell.forest]: HeroMoveCost.forest,
    [Cell.hill]: HeroMoveCost.hill,
    [Cell.largeBuilding]: HeroMoveCost.grass,
    [Cell.water]: HeroMoveCost.stop
};

export enum GiantMoveCost {
    road = 1,
    grass = 2,
    forest = 4,
    hill = 4,
    stop = 500
}

export const giantCellToCost: CellToCost = {
    [Cell.road]: GiantMoveCost.road,
    [Cell.town]: GiantMoveCost.road,
    [Cell.grass]: GiantMoveCost.grass,
    [Cell.forest]: GiantMoveCost.forest,
    [Cell.hill]: GiantMoveCost.hill,
    [Cell.largeBuilding]: GiantMoveCost.grass,
    [Cell.water]: GiantMoveCost.stop
};
