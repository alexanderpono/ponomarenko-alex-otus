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
renderAbstractGraph('', false, 'slide01', -1);
renderAbstractGraph('1. Алгоритм Дейкстры. Шаг 0', true, 'gl-s0', 0);
renderAbstractGraph('1. Алгоритм Дейкстры. Шаг 1', true, 'gl-s1', 1);
renderAbstractGraph('1. Алгоритм Дейкстры. Шаг 2', true, 'gl-s2', 2);
renderAbstractGraph('1. Алгоритм Дейкстры. Шаг 3', true, 'gl-s3', 3);
renderAbstractGraph('1. Алгоритм Дейкстры. Шаг 4', true, 'gl-s4', 4);
renderAbstractGraph('1. Алгоритм Дейкстры. Шаг 5', true, 'gl-s5', 5);
renderAbstractGraph('1. Алгоритм Дейкстры. Шаг 6', true, 'gl-s6', 6);
renderAbstractGraph('1. Кратчайший путь', true, 'graph-ok', ALL_NODES);

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
