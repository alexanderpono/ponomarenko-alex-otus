import { CellInfo } from './types';

export const SMALL_SIZE = 10;
export const MIDDLE_SIZE = 20;
export const LARGE_SIZE = 30;
export const SMALL_SIZE_CAPTION = 'small 5x5';
export const MIDDLE_SIZE_CAPTION = 'medium 10x10';
export const LARGE_SIZE_CAPTION = 'large 20x15';
export const CELL_WIDTH = 20;
export const CELL_HEIGHT = 20;
export const DEFAULT_WIDTH = 5;
export const DEFAULT_HEIGHT = 5;
export const DEFAULT_CELL_STATE = CellInfo.dead;

export enum Size {
    SMALL = 'SMALL',
    MIDDLE = 'MIDDLE',
    LARGE = 'LARGE',
}

export enum Speed {
    SLOW = 'SLOW',
    MEDIUM = 'MEDIUM',
    FAST = 'FAST',
}

export enum Mode {
    PLAY = 'PLAY',
    PAUSE = 'PAUSE',
}

export enum FillPercent {
    P0 = 'P0',
    P25 = 'P25',
    P50 = 'P50',
    P75 = 'P75',
    P100 = 'P100',
}

export const fillPercentToProbability = {
    [FillPercent.P0]: 0,
    [FillPercent.P25]: 0.25,
    [FillPercent.P50]: 0.5,
    [FillPercent.P75]: 0.75,
    [FillPercent.P100]: 1,
};

export const sizeToWH = {
    [Size.SMALL]: { w: 5, h: 5 },
    [Size.MIDDLE]: { w: 10, h: 10 },
    [Size.LARGE]: { w: 20, h: 15 },
};

export const CAPTION_COLOR = '#ddd';
export const PANEL_BG_COLOR = '#555';
export const PANEL_BORDER_COLOR = '#333';
export const DEFAULT_FILL_PERCENT = FillPercent.P25;
