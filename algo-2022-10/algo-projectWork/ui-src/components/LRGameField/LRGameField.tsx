import { Cell, GameField } from '@ui-src/GameField';
import React from 'react';

interface LRGameFieldProps {
    field: GameField;
}

const SPRITE_WIDTH = 40;
const SPRITE_HEIGHT = 40;
interface Sprite {
    x: number;
    y: number;
}
const man: Sprite = {
    x: 0,
    y: 0
};
const wall: Sprite = {
    x: 40,
    y: 120
};
const stairs: Sprite = {
    x: 120,
    y: 120
};
const space: Sprite = {
    x: 0,
    y: 120
};
const gold: Sprite = {
    x: 200,
    y: 120
};

export const LRGameField: React.FC<LRGameFieldProps> = ({ field }) => {
    const canvasRef = React.useRef(null);

    let canvas: HTMLCanvasElement | null = null;
    let context: CanvasRenderingContext2D | null = null;

    React.useEffect(() => {
        canvas = canvasRef.current as unknown as HTMLCanvasElement;
        if (canvas === null) {
            return;
        }
        context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.fillStyle = 'orange';
        context.strokeStyle = '#FF0000';
        context.lineWidth = 3;
        context.strokeRect(0, 0, canvas.width, canvas.height);

        const pic = new Image();
        pic.src = 'sprite.png';

        pic.onload = function () {
            if (canvas === null || context === null) {
                return;
            }

            const renderer = RenderField.create(context, field, pic);
            renderer.draw();
        };
    }, []);

    return <canvas height="440" width="670" id="GraphUI" ref={canvasRef}></canvas>;
};

class RenderField {
    constructor(
        private context: CanvasRenderingContext2D,
        private field: GameField,
        private pic: CanvasImageSource
    ) {}

    draw = () => {
        this.field.field.forEach((line: Cell[], y: number) => {
            line.forEach((cell: Cell, x: number) => {
                let sprite: Sprite = space;
                if (cell === Cell.wall) {
                    sprite = wall;
                }
                if (cell === Cell.stairs) {
                    sprite = stairs;
                }
                if (cell === Cell.man) {
                    sprite = man;
                }
                if (cell === Cell.gold) {
                    sprite = gold;
                }
                this.putSprite(sprite, x, y);
            });
        });
    };

    putSprite = (sprite: Sprite, destX: number, destY: number) => {
        this.context.drawImage(
            this.pic,
            sprite.x,
            sprite.y,
            SPRITE_WIDTH,
            SPRITE_HEIGHT,
            destX * SPRITE_WIDTH,
            destY * SPRITE_HEIGHT,
            SPRITE_WIDTH,
            SPRITE_HEIGHT
        );
    };

    static create = (
        context: CanvasRenderingContext2D,
        field: GameField,
        pic: CanvasImageSource
    ): RenderField => new RenderField(context, field, pic);
}
