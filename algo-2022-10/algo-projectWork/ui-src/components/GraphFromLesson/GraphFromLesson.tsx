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
        y: 190,
        letter: 'A'
    },
    {
        x: 190,
        y: 50,
        letter: 'B'
    },
    {
        x: 260,
        y: 200,
        letter: 'C'
    },
    {
        x: 200,
        y: 380,
        letter: 'D'
    },
    {
        x: 400,
        y: 70,
        letter: 'E'
    },
    {
        x: 460,
        y: 300,
        letter: 'F'
    },
    {
        x: 590,
        y: 160,
        letter: 'G'
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
        context.strokeStyle = '#FF0000';
        context.lineWidth = 3;
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.font = 'bold 30px sans-serif';
        drawEdges(context, graph);
        if (showBestPath) {
            drawBestEdges(context, graph);
        }
        drawVertices(context);
    }, []);

    return (
        <>
            <h2>{caption}</h2>
            <canvas height="440" width="720" id="GraphUI" ref={canvasRef}></canvas>
        </>
    );
};

function drawVertices(context: CanvasRenderingContext2D) {
    vertices.forEach((vertex) => {
        drawCircle(context, vertex.x, vertex.y, 20, 'green', 'white');
        context.fillStyle = 'green';
        context.fillText(vertex.letter, vertex.x - 10, vertex.y + 10);
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
