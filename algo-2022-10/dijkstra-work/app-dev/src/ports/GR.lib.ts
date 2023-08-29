import { SPRITE_HEIGHT, SPRITE_WIDTH, Sprite } from './GR.types';

export const putSprite = (
    context: CanvasRenderingContext2D,
    pic: CanvasImageSource,
    sprite: Sprite,
    destX: number,
    destY: number
) => {
    putSprite_(context, pic, sprite, destX * SPRITE_WIDTH, destY * SPRITE_HEIGHT);
};

export const putSprite_ = (
    context: CanvasRenderingContext2D,
    pic: CanvasImageSource,
    sprite: Sprite,
    screenX: number,
    screenY: number
) => {
    context.drawImage(
        pic,
        sprite.x,
        sprite.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT,
        screenX,
        screenY,
        SPRITE_WIDTH,
        SPRITE_HEIGHT
    );
};
