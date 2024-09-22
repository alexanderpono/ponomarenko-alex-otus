import React from 'react';
import { drawEdge, drawEdgeCost, drawVertex } from '@src/ports/canvas.lib';
import { Edge2D, Vertex2D } from '@src/ports/2D.types';
import { AbstractGraph } from '@src/game/Graph.types';
import parse from 'html-react-parser';

interface AbstractGraphUIProps {
    graph: AbstractGraph;
    caption: string;
    showBestPath: boolean;
    vertices2D: Vertex2D[];
    edges2D: Edge2D[];
}

export const AbstractGraphUI: React.FC<AbstractGraphUIProps> = ({
    graph,
    caption,
    showBestPath,
    vertices2D,
    edges2D
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
        drawEdges(context, graph, vertices2D, edges2D);
        if (showBestPath) {
            drawBestEdges(context, graph, vertices2D);
        }
        drawVertices(context, graph, vertices2D);
    }, []);

    return (
        <>
            {caption && <h3>{parse(caption)}</h3>}
            <div className="canvas">
                <canvas height="350" width="720" id="GraphUI" ref={canvasRef}></canvas>
            </div>
        </>
    );
};

function drawVertices(
    context: CanvasRenderingContext2D,
    graph: AbstractGraph,
    vertices2D: Vertex2D[]
) {
    vertices2D.forEach((vertex2D, index) => {
        const graphVertex = graph.vertices[index];
        drawVertex(
            context,
            vertex2D,
            graphVertex.accessCost,
            graphVertex.processed,
            index,
            graph.curVertexIndex
        );
    });
}

function drawEdges(
    context: CanvasRenderingContext2D,
    graph: AbstractGraph,
    vertices2D: Vertex2D[],
    edges2D: Edge2D[]
) {
    context.strokeStyle = '#000000';

    graph.edges.forEach((edge, index) => {
        drawEdge(context, vertices2D[edge.vertex0], vertices2D[edge.vertex1]);
        drawEdgeCost(
            context,
            vertices2D[edge.vertex0],
            vertices2D[edge.vertex1],
            edge.cost.cost,
            edges2D[index]
        );
    });
}

function drawBestEdges(
    context: CanvasRenderingContext2D,
    graph: AbstractGraph,
    vertices2D: Vertex2D[]
) {
    context.strokeStyle = '#FF0000';

    graph.cheapestPath.forEach((edgeIndex) => {
        drawEdge(
            context,
            vertices2D[graph.edges[edgeIndex].vertex0],
            vertices2D[graph.edges[edgeIndex].vertex1],
            6
        );
    });
}
