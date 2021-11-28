export const SMALL_SIZE = 10;
export const MIDDLE_SIZE = 20;
export const LARGE_SIZE = 30;
export const SMALL_SIZE_CAPTION = 'small 5x5';
export const MIDDLE_SIZE_CAPTION = 'medium 10x10';
export const LARGE_SIZE_CAPTION = 'large 20x15';
export const CELL_WIDTH = 20;
export const CELL_HEIGHT = 20;

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

export const sizeToWH = {
    [Size.SMALL]: { w: 5, h: 5 },
    [Size.MIDDLE]: { w: 10, h: 10 },
    [Size.LARGE]: { w: 20, h: 15 },
};

export const CAPTION_COLOR = '#ddd';
export const PANEL_BG_COLOR = '#555';
export const PANEL_BORDER_COLOR = '#333';
