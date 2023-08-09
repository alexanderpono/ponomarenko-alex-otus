import { Edge2D, Vertex2D } from './2D.types';

export function drawCircle(
    context: CanvasRenderingContext2D,
    xPos: number,
    yPos: number,
    radius: number,
    lineColor: string,
    fillColor: string
) {
    const startAngle = 0 * (Math.PI / 180);
    const endAngle = 360 * (Math.PI / 180);
    context.strokeStyle = lineColor;
    context.fillStyle = fillColor;
    context.lineWidth = 3;
    context.beginPath();
    context.arc(xPos, yPos, radius, startAngle, endAngle, false);
    context.fill();
    context.stroke();
}

export const drawEdge = (
    context: CanvasRenderingContext2D,
    vertex0: Vertex2D,
    vertex1: Vertex2D,
    lineWidth: number = 3
) => {
    const v0 = vertex0;
    const v1 = vertex1;
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(v0.x, v0.y);
    context.lineTo(v1.x, v1.y);
    context.closePath();
    context.stroke();
};

export const drawEdgeCost = (
    context: CanvasRenderingContext2D,
    v0: Vertex2D,
    v1: Vertex2D,
    cost: number,
    edge2D: Edge2D
) => {
    context.fillStyle = 'black';
    let x = (v0.x + v1.x) / 2;
    let y = (v0.y + v1.y) / 2;
    if (typeof edge2D !== 'undefined') {
        x = edge2D.costDx ? x + edge2D.costDx : x;
        y = edge2D.costDy ? y + edge2D.costDy : y;
    }
    context.fillText('' + cost, x, y);
};

const VERTEX_COLOR = 'black';
const VERTEX_BG = 'white';
const PROCESSED_VERTEX_BG = 'black';
const PROCESSED_VERTEX_COLOR = 'white';
const PROCESSED_CIRCLE_COLOR = 'black';
const PROCESSED_COST = 'black';
const CURRENT_VERTEX_COLOR = 'white';
const CURRENT_VERTEX_BG = 'red';
const CURRENT_COST = 'red';

export const drawVertex = (
    context: CanvasRenderingContext2D,
    vertex2D: Vertex2D,
    accessCost: number,
    processed: boolean,
    index: number,
    curVertexIndex: number
) => {
    context.fillStyle = VERTEX_COLOR;
    context.fillText(vertex2D.letter, vertex2D.x - 10, vertex2D.y + 10);

    let caption = '';
    let circleColor = '';
    let circleBg = VERTEX_BG;
    let fillStyle = '';
    let accessCostS = '';
    let vertexCostColor = VERTEX_COLOR;
    let vertexLetterColor = VERTEX_COLOR;
    if (curVertexIndex === -1) {
        circleColor = VERTEX_COLOR;
        fillStyle = VERTEX_COLOR;
        if (accessCost >= 0) {
            accessCostS = `(${accessCost})`;
        }
        caption = vertex2D.letter;
    }
    if (curVertexIndex !== -1 && index !== curVertexIndex) {
        circleColor = VERTEX_COLOR;
        fillStyle = VERTEX_COLOR;
        if (accessCost >= 0) {
            accessCostS = `(${accessCost})`;
        }
        caption = vertex2D.letter;
    }

    if (curVertexIndex !== -1 && index !== curVertexIndex && processed) {
        circleColor = PROCESSED_CIRCLE_COLOR;
        fillStyle = 'lightgrey';
        circleBg = PROCESSED_VERTEX_BG;
        vertexCostColor = PROCESSED_COST;
        vertexLetterColor = PROCESSED_VERTEX_COLOR;
        caption = `${vertex2D.letter}`;
        accessCostS = `(${accessCost})`;
    }

    if (curVertexIndex !== -1 && index === curVertexIndex) {
        if (accessCost !== -1) {
            circleColor = CURRENT_VERTEX_BG;
            circleBg = CURRENT_VERTEX_BG;
            vertexLetterColor = CURRENT_VERTEX_COLOR;
            vertexCostColor = CURRENT_COST;
            accessCostS = `(${accessCost})`;
        } else {
            circleColor = 'green';
            fillStyle = 'green';
        }
        caption = `${vertex2D.letter}`;
    }
    drawCircle(context, vertex2D.x, vertex2D.y, 20, circleColor, circleBg);
    context.fillStyle = vertexLetterColor;
    context.fillText(caption, vertex2D.x - 12, vertex2D.y + 10);
    context.fillStyle = vertexCostColor;
    accessCostS &&
        context.fillText(accessCostS, vertex2D.x + vertex2D.costDx, vertex2D.y + vertex2D.costDy);
};
