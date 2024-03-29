import { Cell, GameField } from '@ui-src/GameField';
import { COST_SPACE, Edge, Graph, RenderOptions, UNDEFINED_COST } from '@ui-src/Graph';
import { SPRITE_HEIGHT, SPRITE_WIDTH } from './GR.types';

const w2 = SPRITE_WIDTH / 2;
const h2 = SPRITE_HEIGHT / 2;
const w4 = SPRITE_WIDTH / 4;

export class GRGraph {
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
            this.drawPath(this.graph.edges[edgeIndex]);
        });
    };

    renderVerticesCost = () => {
        if (!this.options.nodesCost) {
            return;
        }
        this.context.font = 'bold 15px sans-serif';
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
        if (edge.cost.v0v1Cost !== UNDEFINED_COST) {
            this.context.strokeStyle = edge.cost.v0v1Cost === COST_SPACE ? 'green' : 'red';
            const midX = w2 + ((v0x + v1x) / 2) * SPRITE_WIDTH;
            const midY = h2 + ((v0y + v1y) / 2) * SPRITE_HEIGHT;
            this.context.lineTo(midX, midY);
            this.context.stroke();
            this.context.closePath();

            this.context.beginPath();
            this.context.strokeStyle = edge.cost.v1v0Cost === COST_SPACE ? 'green' : 'red';
            this.context.moveTo(midX, midY);
        } else {
            this.context.strokeStyle = 'green';
        }
        this.context.lineTo(w2 + v1x * SPRITE_WIDTH, h2 + v1y * SPRITE_HEIGHT);
        this.context.stroke();
        this.context.closePath();
    };

    drawPath = (edge: Edge) => {
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
    ): GRGraph => new GRGraph(context, field, graph, options);
}

function drawCircle(context: CanvasRenderingContext2D, xPos: number, yPos: number, radius: number) {
    const startAngle = 0 * (Math.PI / 180);
    const endAngle = 360 * (Math.PI / 180);
    context.beginPath();
    context.arc(xPos, yPos, radius, startAngle, endAngle, false);
    context.fill();
    context.stroke();
}
