import React from 'react';
import { render } from 'react-dom';
import { Graph, RenderOptions, SILENT, VERBOSE } from './Graph';
import { GraphFromLesson } from './components/GraphFromLesson';
import { GameField } from './GameField';
import { LRGameField } from './components/LRGameField';
import { GraphV4 } from './GraphV4';

export const slide0 = () => {
    renderGraphFromLesson();
};

function renderGraphFromLesson() {
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
    console.log('adjacencyMatrix=', adjacencyMatrix);
    console.log(
        '\nadjacencyMatrix=',
        JSON.stringify(Graph.create().initFromAdjacencyString(adjacencyMatrix).getMatrix())
    );

    const g = Graph.create()
        .initFromAdjacencyString(adjacencyMatrix)
        .calcEdges()
        .calcVertices()
        .calcVerticesCost(6, 0, SILENT)
        .calcCheapestPath(6, 0);
    console.log(g.printPathFromTo(6, 0));

    render([<GraphFromLesson graph={g} />], document.getElementById('GraphFromLesson'));
}
const fieldS0 = `
▓ M             ▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓
▓       ╡       ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓
▓           ╡   ▓
▓▓▓╡▓▓▓▓▓▓▓▓▓▓▓▓▓
▓  ╡         $  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
`;
const field0 = GameField.create().initFromText(fieldS0);

export const slide1 = () => {
    const graph0 = Graph.create().initFromField(field0, field0.getEdgeSimpleCost);

    renderLRField(
        'Траектория движения на сетке из ребер с одинаковыми стоимостями',
        fieldS0,
        'slide1',
        {
            nodes: true,
            lines: true,
            path: true,
            nodesCost: false,
            map: false
        },
        graph0,
        field0
    );
};

export function renderLRField(
    title: string,
    fieldString: string,
    target: string,
    options: RenderOptions,
    graph: Graph,
    field: GameField
) {
    const mIndex = graph.getVertexIndex(fieldString, 'M');
    const dIndex = graph.getVertexIndex(fieldString, '$');
    graph.calcVerticesCost(mIndex, dIndex, SILENT).calcCheapestPath(mIndex, dIndex);
    // console.log(graph.printPathFromTo(mIndex, dIndex));
    render(
        [<LRGameField field={field} graph={graph} render={options} id={target} title={title} />],
        document.getElementById(target)
    );
}

export const slide2 = () => {
    const graph1 = Graph.create().initFromField(field0, field0.getEdgeAdvancedCost);
    renderLRField(
        'Траектория движения с обходом препятствий. Доступен только один путь',
        fieldS0,
        'slide2',
        {
            nodes: false,
            lines: false,
            path: true,
            nodesCost: false,
            map: true
        },
        graph1,
        field0
    );
};

export const slide3a = () => {
    const fieldS2 = `
▓ M             ▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓
▓       ╡       ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓
▓           ╡   ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓
▓  ╡     ╡   $╡ ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;
    const field2 = GameField.create().initFromText(fieldS2);
    const graph2 = Graph.create().initFromField(field2, field2.getEdgeAdvancedCost);
    renderLRField(
        'Проблема: алгоритм не нашел оптимальный путь (ошибка в реализации)',
        fieldS2,
        'slide3a',
        {
            nodes: false,
            lines: false,
            path: true,
            nodesCost: false,
            map: true
        },
        graph2,
        field2
    );
};

export const slide3 = () => {
    const fieldS2 = `
▓ M             ▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓
▓       ╡       ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓
▓           ╡   ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓
▓  ╡     ╡   $╡ ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;
    const field2 = GameField.create().initFromText(fieldS2);
    const graph2 = GraphV4.create().initFromField(field2, field2.getEdgeAdvancedCost);
    renderLRField(
        'Результат выбора оптимального пути',
        fieldS2,
        'slide3',
        {
            nodes: false,
            lines: false,
            path: true,
            nodesCost: false,
            map: true
        },
        graph2,
        field2
    );
};

export const slide4 = () => {
    const fieldS3 = `
▓ M             ▓
▓▓▓▓ ▓▓▓╡▓▓▓▓▓▓▓▓
▓       ╡       ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓
▓           ╡   ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓
▓  ╡     ╡   $╡ ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;

    const field3 = GameField.create().initFromText(fieldS3);
    const graph3 = GraphV4.create().initFromField(field3, field3.getEdgeAdvancedCost);

    renderLRField(
        'Проблема: персонаж должен падать в отверстие в полу',
        fieldS3,
        'slide4',
        {
            nodes: false,
            lines: true,
            path: true,
            nodesCost: true,
            map: true
        },
        graph3,
        field3
    );
};

export const slide5 = () => {
    const fieldS = `
▓ M             ▓
▓▓▓▓ ▓▓▓╡▓▓▓▓▓▓▓▓
▓       ╡       ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓
▓           ╡   ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓
▓  ╡     ╡   $╡ ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;

    const field = GameField.create().initFromText(fieldS);
    const graph = GraphV4.create().initFromField(field, field.getEdgeAdvancedCost);

    renderLRField(
        'Проблема2: персонаж должен падать в отверстие в полу',
        fieldS,
        'slide5',
        {
            nodes: false,
            lines: true,
            path: true,
            nodesCost: true,
            map: true
        },
        graph,
        field
    );
};
