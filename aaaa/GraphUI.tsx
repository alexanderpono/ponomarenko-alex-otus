import { Graph } from '@ui-src/Graph';
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

interface GraphUIProps {
    graph: Graph;
}

export const GraphUI: React.FC<GraphUIProps> = ({ graph }) => {
    React.useEffect(() => {
        const canvas = document.getElementById('first_example') as HTMLCanvasElement;
        if (canvas === null) {
            return;
        }
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.fillStyle = 'orange';
        // context.fillStyle = '#FFA500';
        // context.fillStyle = 'rgb(255,165,0)';
        // context.fillStyle = 'rgba(255,165,0,1)';
        context.strokeStyle = '#FF0000'; // Цвет обводки
        context.lineWidth = 3; // Ширина линии
        // context.fillStyle = '#00FF00'; // Цвет заливки
        context.strokeRect(0, 0, canvas.width, canvas.height);
        // context.clearRect(10, 10, 200, 200); // Очистка области указанного размера и положения
        // // context.clearRect(0, 0, canvas.width, canvas.height); // Очистка всего холста

        // context.strokeStyle = '#FF0000'; // Цвет обводки
        // context.lineWidth = 3; // Ширина линии
        // context.fillStyle = '#00FF00'; // Цвет заливки

        // context.fillRect(10, 10, 390, 100);
        // context.strokeRect(40, 130, 200, 150);

        // context.fillStyle = 'rgb(200, 0, 0)';
        // context.fillStyle = 'rgb(200, 0, 0)';
        // context.fillRect(15, 15, 100, 100);
        // context.fillStyle = 'rgb(0, 200, 0)';
        // context.fillRect(30, 30, 100, 100);
        // context.fillStyle = 'rgb(0, 0, 200)';
        // context.fillRect(45, 45, 100, 100);

        // context.fillStyle = 'rgb(0, 0, 0)';
        // const x = 150;
        // const y = 20;
        // // // Внешняя рамка для доски
        // context.strokeRect(x - 5, y - 5, 266, 266);
        // // // Внутренняя рамка для доски
        // context.strokeRect(x - 2, y - 2, 260, 260);
        // // // Закрашиваем внутреннюю область черным цветом
        // context.fillRect(x, y, 256, 256);
        // for (let i = 0; i < 8; i += 2)
        //     for (let j = 0; j < 8; j += 2) {
        //         context.clearRect(x + i * 32, y + j * 32, 32, 32);
        //         context.clearRect(x + (i + 1) * 32, y + (j + 1) * 32, 32, 32);
        //     }

        // context.beginPath();
        // context.moveTo(10, 10); // Начало линии
        // context.lineTo(100, 100); // Узел линии
        // context.lineTo(150, 100); // Конец линии
        // context.closePath();
        // context.stroke();

        // context.beginPath();
        // context.moveTo(50, 50);
        // context.lineTo(50, 250);
        // context.lineTo(250, 250);
        // context.closePath();
        // context.fill();
        context.font = 'bold 30px sans-serif';
        // context.fillText(vertices[0].letter, vertices[0].x, vertices[0].y);
        drawEdges(context);
        drawVertices(context);
        drawBestEdges(context, graph);
        console.error('edges=', graph.edges);
        console.error('vertices=', graph.vertices);
    }, []);

    function drawVertices(context) {
        vertices.forEach((vertex) => {
            drawCircle(context, vertex.x, vertex.y, 20, 'green', 'white');
            context.fillStyle = 'green';
            context.fillText(vertex.letter, vertex.x - 10, vertex.y + 10);
        });
    }

    const drawEdge = (context, edge) => {
        const v0 = vertices[edge.vertex0];
        const v1 = vertices[edge.vertex1];
        context.beginPath();
        context.moveTo(v0.x, v0.y);
        context.lineTo(v1.x, v1.y);
        context.closePath();
        context.stroke();
    };

    const drawEdgeCost = (context, edge) => {
        const v0 = vertices[edge.vertex0];
        const v1 = vertices[edge.vertex1];
        context.fillStyle = 'black';
        context.fillText('' + edge.cost, (v0.x + v1.x) / 2, (v0.y + v1.y) / 2);
    };

    function drawEdges(context) {
        context.strokeStyle = '#000000';

        graph.edges.forEach((edge) => {
            drawEdge(context, edge);
            drawEdgeCost(context, edge);
        });
    }

    function drawBestEdges(context, graph) {
        context.strokeStyle = '#FF0000';

        graph.cheapestPath.forEach((edgeIndex) => {
            drawEdge(context, graph.edges[edgeIndex]);
        });
    }

    function drawCircle(context, xPos, yPos, radius, lineColor, fillColor) {
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

    return <div>GraphUI</div>;
};
