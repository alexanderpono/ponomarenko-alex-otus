import { Cell, GameField } from '@ui-src/GameField';
import { Edge, Graph } from '@ui-src/Graph';
import React from 'react';

interface LRGameFieldProps {
    field: GameField;
    graph: Graph;
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

export const LRGameField: React.FC<LRGameFieldProps> = ({ field, graph }) => {
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

            RenderField.create(context, field, pic).draw();
            RenderFieldGraph.create(context, field, graph).draw();
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

const w2 = SPRITE_WIDTH / 2;
const h2 = SPRITE_HEIGHT / 2;

class RenderFieldGraph {
    constructor(
        private context: CanvasRenderingContext2D,
        private field: GameField,
        private graph: Graph
    ) {}

    draw = () => {
        this.context.strokeStyle = 'green';
        this.graph.edges.forEach((edge: Edge) => this.drawEdge(edge));

        this.context.strokeStyle = 'green';
        this.context.fillStyle = 'white';
        this.context.lineWidth = 3;
        this.field.field.forEach((line: Cell[], y: number) => {
            line.forEach((cell: Cell, x: number) => this.drawVertex(x, y));
        });
    };

    drawVertex = (x: number, y: number) =>
        drawCircle(this.context, w2 + x * SPRITE_WIDTH, h2 + y * SPRITE_HEIGHT, 6);

    drawEdge = (edge: Edge) => {
        const w = this.field.field[0].length;
        const v0x = edge.vertex0 % w;
        const v0y = Math.floor(edge.vertex0 / w);
        const v1x = edge.vertex1 % w;
        const v1y = Math.floor(edge.vertex1 / w);

        this.context.beginPath();
        this.context.moveTo(w2 + v0x * SPRITE_WIDTH, h2 + v0y * SPRITE_HEIGHT);
        this.context.lineTo(w2 + v1x * SPRITE_WIDTH, h2 + v1y * SPRITE_HEIGHT);
        this.context.closePath();
        this.context.stroke();
    };

    static create = (
        context: CanvasRenderingContext2D,
        field: GameField,
        graph: Graph
    ): RenderFieldGraph => new RenderFieldGraph(context, field, graph);
}

function drawCircle(context: CanvasRenderingContext2D, xPos: number, yPos: number, radius: number) {
    const startAngle = 0 * (Math.PI / 180);
    const endAngle = 360 * (Math.PI / 180);
    context.beginPath();
    context.arc(xPos, yPos, radius, startAngle, endAngle, false);
    context.fill();
    context.stroke();
}
