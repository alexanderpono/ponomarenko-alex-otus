import React from 'react';
import { render } from 'react-dom';
import './app.css';
import { GraphFromAdjString } from './game/GraphFromAdjString';
import { ALL_NODES, GraphCalculator, SILENT } from './game/GraphCalculator';
import { AbstractGraphUI } from './components/AbstractGraph/AbstractGraphUI';
import {
    adjacencyMatrix,
    renderEdges2D,
    renderVertices
} from './components/AbstractGraph/AbstractGraph.const';
import { GameField } from './game/GameField';

renderAbstractGraph('1. Алгоритм Дейкстры. Исходный граф', false, 'slide00', -1);
renderAbstractGraph('1. Алгоритм Дейкстры: кратчайший путь', true, 'graph-ok', ALL_NODES);

function renderAbstractGraph(
    caption: string,
    showBestPath: boolean,
    targetHtmlId: string,
    stepNo: number
) {
    let graph = new GraphFromAdjString().graphFromAdjacencyString(adjacencyMatrix);
    graph = new GraphCalculator().calculateGraph(graph, 6, 0, SILENT, stepNo, GameField.create());

    render(
        <AbstractGraphUI
            graph={graph}
            caption={caption}
            showBestPath={showBestPath}
            vertices2D={renderVertices}
            edges2D={renderEdges2D}
        />,
        document.getElementById(targetHtmlId)
    );
}

renderAbstractGraph('', true, 'brief_2', ALL_NODES);
