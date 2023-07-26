export const SPRITE_WIDTH = 40;
export const SPRITE_HEIGHT = 40;
export interface Sprite {
    x: number;
    y: number;
}
export const man: Sprite = {
    x: 0,
    y: 160
};
export const manR0: Sprite = {
    x: 40,
    y: 0
};
export const manR1: Sprite = {
    x: 80,
    y: 0
};
export const manR2: Sprite = {
    x: 120,
    y: 0
};
export const manL0: Sprite = {
    x: 160,
    y: 0
};
export const manL1: Sprite = {
    x: 200,
    y: 0
};
export const manL2: Sprite = {
    x: 240,
    y: 0
};
export const wall: Sprite = {
    x: 40,
    y: 120
};
export const stairs: Sprite = {
    x: 120,
    y: 120
};
export const manU0: Sprite = {
    x: 280,
    y: 0
};
export const manU1: Sprite = {
    x: 320,
    y: 0
};
export const space: Sprite = {
    x: 0,
    y: 120
};
export const gold: Sprite = {
    x: 200,
    y: 120
};

export enum ManAni {
    STAND = 'STAND',
    RIGHT = 'RIGHT',
    LEFT = 'LEFT',
    STAIRS = 'STAIRS'
}
