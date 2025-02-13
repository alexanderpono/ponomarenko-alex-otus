export const SPRITE_WIDTH = 40;
export const SPRITE_HEIGHT = 40;
export interface Sprite {
    x: number;
    y: number;
}

export enum ManAni {
    STAND = 'STAND',
    RIGHT = 'RIGHT',
    LEFT = 'LEFT',
    STAIRS = 'STAIRS',
    UP = 'UP',
    DOWN = 'DOWN',
    TELEPORT = 'TELEPORT',
    PIPE_RIGHT = 'PIPE_RIGHT',
    PIPE_LEFT = 'PIPE_LEFT',
    PIPE_STAND = 'PIPE_STAND'
}
