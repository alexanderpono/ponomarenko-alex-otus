import { Cell, GameField } from '@ui-src/GameField';
import { Edge, Graph, RenderOptions } from '@ui-src/Graph';
import React from 'react';

interface LRGameFieldProps {
    field: GameField;
    graph: Graph;
    render: RenderOptions;
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

export const LRGameField: React.FC<LRGameFieldProps> = ({ field, graph, render: startRender }) => {
    const canvasRef = React.useRef(null);

    let canvas: HTMLCanvasElement | null = null;
    let context: CanvasRenderingContext2D | null = null;

    const [nodesChecked, setNodesChecked] = React.useState(startRender.nodes);
    const [linesChecked, setLinesChecked] = React.useState(startRender.lines);
    const [pathChecked, setPathChecked] = React.useState(startRender.path);
    const [nodesCostChecked, setNodesCostChecked] = React.useState(startRender.nodesCost);
    const nodesClicked = () => setNodesChecked(!nodesChecked);
    const linesClicked = () => setLinesChecked(!linesChecked);
    const pathClicked = () => setPathChecked(!pathChecked);
    const nodesCostClicked = () => setNodesCostChecked(!nodesCostChecked);
    const [picLoaded, setPicLoaded] = React.useState(false);
    const [pic] = React.useState(new Image());

    React.useEffect(() => {
        pic.src = 'sprite.png';

        pic.onload = function () {
            setPicLoaded(true);
        };
    }, []);

    React.useEffect(() => {
        if (!picLoaded) {
            return;
        }

        canvas = canvasRef.current as unknown as HTMLCanvasElement;
        if (canvas === null) {
            return;
        }
        context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.fillStyle = 'orange';
        context.strokeStyle = '#FF0000';
        context.lineWidth = 3;
        context.strokeRect(0, 0, canvas.width, canvas.height);

        if (canvas === null || context === null) {
            return;
        }

        const options: RenderOptions = {
            nodes: nodesChecked,
            lines: linesChecked,
            path: pathChecked,
            nodesCost: nodesCostChecked
        };

        RenderField.create(context, field, pic).draw();
        RenderFieldGraph.create(context, field, graph, options).draw();
    }, [picLoaded, nodesChecked, linesChecked, pathChecked, nodesCostChecked]);

    return (
        <div>
            <canvas height="320" width="670" id="GraphUI" ref={canvasRef}></canvas>
            <fieldset>
                <legend>Отображать</legend>
                {Label(nodesChecked, nodesClicked, 'nodes', 'Узлы сетки')}
                {Label(linesChecked, linesClicked, 'lines', 'Линии сетки')}
                {Label(pathChecked, pathClicked, 'path', 'Траектория')}
                {Label(nodesCostChecked, nodesCostClicked, 'nodesCost', 'Стоимость узлов')}
            </fieldset>
        </div>
    );
};

function Label(val: boolean, setter: () => void, id: string, caption: string) {
    return (
        <label htmlFor={id}>
            <input type="checkbox" checked={val} onChange={setter} id={id} />
            {caption}
        </label>
    );
}

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
const w4 = SPRITE_WIDTH / 4;

class RenderFieldGraph {
    constructor(
        private context: CanvasRenderingContext2D,
        private field: GameField,
        private graph: Graph,
        private options: RenderOptions
    ) {}

    renderVertices = () => {
        if (!this.options.nodes) {
            return;
        }
        this.context.strokeStyle = 'green';
        this.context.fillStyle = 'white';
        this.context.lineWidth = 3;
        this.field.field.forEach((line: Cell[], y: number) => {
            line.forEach((cell: Cell, x: number) => this.drawVertex(x, y));
        });
    };
    renderLines = () => {
        if (!this.options.lines) {
            return;
        }
        this.context.strokeStyle = 'green';
        this.context.font = 'bold 15px sans-serif';
        this.graph.edges.forEach((edge: Edge) => {
            this.drawEdge(edge);
            // this.drawEdgeCost(edge);
        });
    };

    renderPath = () => {
        if (!this.options.path) {
            return;
        }
        this.context.lineWidth = 6;
        this.context.strokeStyle = 'magenta';
        this.graph.cheapestPath.forEach((edgeIndex) => {
            this.drawEdge(this.graph.edges[edgeIndex]);
        });
    };

    renderVerticesCost = () => {
        if (!this.options.nodesCost) {
            return;
        }
        this.context.strokeStyle = 'green';
        this.context.fillStyle = 'white';
        this.context.lineWidth = 3;
        this.field.field.forEach((line: Cell[], y: number) => {
            line.forEach((cell: Cell, x: number) => this.drawVertexCost(x, y));
        });
    };

    draw = () => {
        this.renderLines();
        this.renderVertices();
        this.renderPath();
        this.renderVerticesCost();
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

    drawEdgeCost = (edge: Edge) => {
        const w = this.field.field[0].length;
        const v0x = edge.vertex0 % w;
        const v0y = Math.floor(edge.vertex0 / w);
        const v1x = edge.vertex1 % w;
        const v1y = Math.floor(edge.vertex1 / w);
        this.context.fillStyle = 'white';
        if (v0y === v1y) {
            this.context.fillText(
                '' + edge.cost,
                w4 + 3 + ((v0x + v1x) / 2) * SPRITE_WIDTH,
                -h2 - 2 + ((v0y + v1y) / 2) * SPRITE_HEIGHT
            );
        } else {
            this.context.fillText(
                '' + edge.cost,
                w2 + ((v0x + v1x) / 2) * SPRITE_WIDTH,
                h2 + 3 + ((v0y + v1y) / 2) * SPRITE_HEIGHT
            );
        }
    };

    drawVertexCost = (x: number, y: number) => {
        const w = this.field.field[0].length;
        const vIndex = y * w + x;
        const vertex = this.graph.vertices[vIndex];
        this.context.fillStyle = 'white';
        this.context.fillText(
            '' + vertex.accessCost,
            x * SPRITE_WIDTH + w4,
            y * SPRITE_HEIGHT + h2
        );
    };

    static create = (
        context: CanvasRenderingContext2D,
        field: GameField,
        graph: Graph,
        options: RenderOptions
    ): RenderFieldGraph => new RenderFieldGraph(context, field, graph, options);
}

function drawCircle(context: CanvasRenderingContext2D, xPos: number, yPos: number, radius: number) {
    const startAngle = 0 * (Math.PI / 180);
    const endAngle = 360 * (Math.PI / 180);
    context.beginPath();
    context.arc(xPos, yPos, radius, startAngle, endAngle, false);
    context.fill();
    context.stroke();
}
