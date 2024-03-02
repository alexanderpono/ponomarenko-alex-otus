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
export const select: Sprite = {
    x: 0,
    y: 40
};
export const eaterU: Sprite = {
    x: 200,
    y: 40
};
export const eaterD0: Sprite = {
    x: 120,
    y: 40
};
export const eaterD1: Sprite = {
    x: 280,
    y: 40
};
export const eaterR0: Sprite = {
    x: 80,
    y: 40
};
export const eaterR1: Sprite = {
    x: 240,
    y: 40
};
export const eaterL: Sprite = {
    x: 160,
    y: 40
};
export const eater: Sprite = {
    x: 40,
    y: 160
};
export const spark0: Sprite = {
    x: 400,
    y: 40
};
export const spark1: Sprite = {
    x: 440,
    y: 40
};
export const spark2: Sprite = {
    x: 480,
    y: 40
};
export const spark3: Sprite = {
    x: 520,
    y: 40
};
export const spark4: Sprite = {
    x: 560,
    y: 40
};
export const telePortal: Sprite = {
    x: 520,
    y: 120
};

export enum ManAni {
    STAND = 'STAND',
    RIGHT = 'RIGHT',
    LEFT = 'LEFT',
    STAIRS = 'STAIRS',
    UP = 'UP',
    DOWN = 'DOWN',
    TELEPORT = 'TELEPORT'
}
