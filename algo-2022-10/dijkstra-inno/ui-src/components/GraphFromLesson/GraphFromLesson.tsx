import { Edge, Graph } from '@ui-src/Graph';
import React from 'react';

interface Vertex2D {
    x: number;
    y: number;
    letter: string;
}

const vertices: Vertex2D[] = [
    {
        x: 70,
        y: 170,
        letter: 'А'
    },
    {
        x: 190,
        y: 30,
        letter: 'Б'
    },
    {
        x: 260,
        y: 170,
        letter: 'В'
    },
    {
        x: 200,
        y: 320,
        letter: 'Г'
    },
    {
        x: 400,
        y: 50,
        letter: 'Д'
    },
    {
        x: 460,
        y: 280,
        letter: 'Е'
    },
    {
        x: 590,
        y: 140,
        letter: 'Ё'
    }
];

interface GraphFromLessonProps {
    graph: Graph;
    caption: string;
    showBestPath: boolean;
}

export const GraphFromLesson: React.FC<GraphFromLessonProps> = ({
    graph,
    caption,
    showBestPath
}) => {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;
        if (canvas === null) {
            return;
        }
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.fillStyle = 'orange';
        context.strokeStyle = '#FFFFFF';
        context.lineWidth = 3;
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.font = 'bold 30px sans-serif';
        drawEdges(context, graph);
        if (showBestPath) {
            drawBestEdges(context, graph);
        }
        drawVertices(context, graph);
    }, []);

    return (
        <>
            <h3>{caption}</h3>
            <canvas height="350" width="720" id="GraphUI" ref={canvasRef}></canvas>
        </>
    );
};

function drawVertices(context: CanvasRenderingContext2D, graph: Graph) {
    vertices.forEach((vertex, index) => {
        drawCircle(context, vertex.x, vertex.y, 20, 'green', 'white');
        context.fillStyle = 'green';
        context.fillText(vertex.letter, vertex.x - 10, vertex.y + 10);

        let caption = '';
        let circleColor = '';
        let fillStyle = '';
        const vertex2 = graph.vertices[index];
        if (graph.curVertexIndex === -1) {
            circleColor = 'green';
            fillStyle = 'green';
            if (vertex2.accessCost >= 0) {
                caption = `${vertex.letter}(${vertex2.accessCost})`;
            } else {
                caption = vertex.letter;
            }
        }

        if (graph.curVertexIndex !== -1 && index !== graph.curVertexIndex) {
            circleColor = 'green';
            fillStyle = 'green';
            if (vertex2.accessCost >= 0) {
                caption = `${vertex.letter}(${vertex2.accessCost})`;
            } else {
                caption = vertex.letter;
            }
        }

        if (graph.curVertexIndex !== -1 && index !== graph.curVertexIndex && vertex2.processed) {
            circleColor = 'lightgrey';
            fillStyle = 'lightgrey';
            caption = `${vertex.letter}(${vertex2.accessCost})`;
        }

        if (graph.curVertexIndex !== -1 && index === graph.curVertexIndex) {
            if (vertex2.accessCost !== -1) {
                circleColor = 'red';
                fillStyle = 'red';
                caption = `${vertex.letter}(${vertex2.accessCost})`;
            } else {
                circleColor = 'green';
                fillStyle = 'green';
                caption = `${vertex.letter}`;
            }
        }
        drawCircle(context, vertex.x, vertex.y, 20, circleColor, 'white');
        context.fillStyle = fillStyle;
        context.fillText(caption, vertex.x - 10, vertex.y + 10);
    });
}

function drawCircle(
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

const drawEdge = (context: CanvasRenderingContext2D, edge: Edge) => {
    const v0 = vertices[edge.vertex0];
    const v1 = vertices[edge.vertex1];
    context.beginPath();
    context.moveTo(v0.x, v0.y);
    context.lineTo(v1.x, v1.y);
    context.closePath();
    context.stroke();
};

const drawEdgeCost = (context: CanvasRenderingContext2D, edge: Edge) => {
    const v0 = vertices[edge.vertex0];
    const v1 = vertices[edge.vertex1];
    context.fillStyle = 'black';
    context.fillText('' + edge.cost.cost, (v0.x + v1.x) / 2, (v0.y + v1.y) / 2);
};

function drawEdges(context: CanvasRenderingContext2D, graph: Graph) {
    context.strokeStyle = '#000000';

    graph.edges.forEach((edge) => {
        drawEdge(context, edge);
        drawEdgeCost(context, edge);
    });
}

function drawBestEdges(context: CanvasRenderingContext2D, graph: Graph) {
    context.strokeStyle = '#FF0000';

    graph.cheapestPath.forEach((edgeIndex) => {
        drawEdge(context, graph.edges[edgeIndex]);
    });
}
