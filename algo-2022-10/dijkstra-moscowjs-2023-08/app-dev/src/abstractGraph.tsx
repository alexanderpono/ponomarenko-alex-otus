import React from 'react';
import { render } from 'react-dom';
import './app.css';
import { Vertex2D } from './ports/2D.types';
import { GraphFromAdjString } from './game/GraphFromAdjString';
import { ALL_NODES, GraphCalculator, SILENT } from './game/GraphCalculator';
import { AbstractGraphUI } from './components/AbstractGraph/AbstractGraphUI';

renderAbstractGraph('Пример графа', false, 'slide00', -1);
renderAbstractGraph('1. Алгоритм Дейкстры. Исходный граф', false, 'GraphFromLesson', -1);
renderAbstractGraph('1. Алгоритм Дейкстры. Шаг 0', true, 'gl-s0', 0);
renderAbstractGraph('1. Алгоритм Дейкстры. Шаг 1', true, 'gl-s1', 1);
renderAbstractGraph('1. Алгоритм Дейкстры. Шаг 2', true, 'gl-s2', 2);
renderAbstractGraph('1. Алгоритм Дейкстры. Шаг 3', true, 'gl-s3', 3);
renderAbstractGraph('1. Алгоритм Дейкстры. Шаг 4', true, 'gl-s4', 4);
renderAbstractGraph('1. Алгоритм Дейкстры. Шаг 5', true, 'gl-s5', 5);
renderAbstractGraph('1. Алгоритм Дейкстры. Шаг 6', true, 'gl-s6', 6);
renderAbstractGraph(
    '1. Алгоритм Дейкстры: рассчитан кратчайший путь',
    true,
    'GraphFromLesson-2',
    ALL_NODES
);

function renderAbstractGraph(
    caption: string,
    showBestPath: boolean,
    targetHtmlId: string,
    stepNo: number
) {
    const adjacencyMatrix = `
  AABBCCDDEEFFGG
AA..020306......
BB02..04..09....
CC0304..010706..
DD06..01....04..
EE..0907....0105
FF....060401..08
GG........0508..
`;

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

    let graph = new GraphFromAdjString().graphFromAdjacencyString(adjacencyMatrix);
    graph = new GraphCalculator().calculateGraph(graph, 6, 0, SILENT, stepNo);

    render(
        <AbstractGraphUI
            graph={graph}
            caption={caption}
            showBestPath={showBestPath}
            vertices2D={vertices}
        />,
        document.getElementById(targetHtmlId)
    );
}
