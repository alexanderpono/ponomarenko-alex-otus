import { Vertex2D } from './2D.types';

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
    vertex1: Vertex2D
) => {
    const v0 = vertex0;
    const v1 = vertex1;
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
    cost: number
) => {
    context.fillStyle = 'black';
    context.fillText('' + cost, (v0.x + v1.x) / 2, (v0.y + v1.y) / 2);
};

export const drawVertex = (
    context: CanvasRenderingContext2D,
    vertex2D: Vertex2D,
    accessCost: number,
    processed: boolean,
    index: number,
    curVertexIndex: number
) => {
    drawCircle(context, vertex2D.x, vertex2D.y, 20, 'green', 'white');
    context.fillStyle = 'green';
    context.fillText(vertex2D.letter, vertex2D.x - 10, vertex2D.y + 10);

    let caption = '';
    let circleColor = '';
    let fillStyle = '';
    if (curVertexIndex === -1) {
        circleColor = 'green';
        fillStyle = 'green';
        if (accessCost >= 0) {
            caption = `${vertex2D.letter}(${accessCost})`;
        } else {
            caption = vertex2D.letter;
        }
    }
    if (curVertexIndex !== -1 && index !== curVertexIndex) {
        circleColor = 'green';
        fillStyle = 'green';
        if (accessCost >= 0) {
            caption = `${vertex2D.letter}(${accessCost})`;
        } else {
            caption = vertex2D.letter;
        }
    }

    if (curVertexIndex !== -1 && index !== curVertexIndex && processed) {
        circleColor = 'lightgrey';
        fillStyle = 'lightgrey';
        caption = `${vertex2D.letter}(${accessCost})`;
    }

    if (curVertexIndex !== -1 && index === curVertexIndex) {
        if (accessCost !== -1) {
            circleColor = 'red';
            fillStyle = 'red';
            caption = `${vertex2D.letter}(${accessCost})`;
        } else {
            circleColor = 'green';
            fillStyle = 'green';
            caption = `${vertex2D.letter}`;
        }
    }
    drawCircle(context, vertex2D.x, vertex2D.y, 20, circleColor, 'white');
    context.fillStyle = fillStyle;
    context.fillText(caption, vertex2D.x - 10, vertex2D.y + 10);
};
