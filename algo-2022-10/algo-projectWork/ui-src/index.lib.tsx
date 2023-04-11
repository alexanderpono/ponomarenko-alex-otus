import React from 'react';
import { render } from 'react-dom';
import { Graph, RenderOptions, SILENT } from './Graph';
import { GraphFromLesson } from './components/GraphFromLesson';
import { GameField } from './GameField';
import { LRGameField } from './components/LRGameField';
import { GraphV4 } from './GraphV4';
import { GraphV5 } from './GraphV5';
import { AppController } from './AppController';

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
▓ M              ▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓▓
▓       ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓  ╡         $   ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
`;
const field0 = GameField.create().initFromText(fieldS0);

export const slide1 = () => {
    const graph0 = Graph.create().initFromField(field0, Graph.create().getEdgeSimpleCost);

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
        field0,
        SILENT
    );
};

export function renderLRField(
    title: string,
    fieldString: string,
    target: string,
    options: RenderOptions,
    graph: Graph,
    field: GameField,
    echoMode: boolean
) {
    const mIndex = graph.getVertexIndex(fieldString, 'M');
    const dIndex = graph.getVertexIndex(fieldString, '$');
    graph.calcVerticesCost(mIndex, dIndex, echoMode).calcCheapestPath(mIndex, dIndex);
    // console.log(graph.printPathFromTo(mIndex, dIndex));
    render(
        [<LRGameField field={field} graph={graph} render={options} id={target} title={title} />],
        document.getElementById(target)
    );
}

export const slide2 = () => {
    const graph1 = Graph.create().initFromField(field0, Graph.create().getEdgeAdvancedCost);
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
        field0,
        SILENT
    );
};

export const slide3a = () => {
    const fieldS2 = `
▓ M              ▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓▓
▓       ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓
▓  ╡     ╡   $╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;
    const field2 = GameField.create().initFromText(fieldS2);
    const graph2 = Graph.create().initFromField(field2, Graph.create().getEdgeAdvancedCost);
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
        field2,
        SILENT
    );
};

export const slide3 = () => {
    const fieldS2 = `
▓ M              ▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓▓
▓       ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓
▓  ╡     ╡   $╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;
    const field2 = GameField.create().initFromText(fieldS2);
    const graph2 = GraphV4.create().initFromField(field2, Graph.create().getEdgeAdvancedCost);
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
        field2,
        SILENT
    );
};

export const slide4 = () => {
    const fieldS3 = `
▓ M              ▓
▓▓▓▓ ▓▓▓╡▓▓▓▓▓▓▓▓▓
▓       ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓
▓  ╡     ╡   $╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;

    const field3 = GameField.create().initFromText(fieldS3);
    const graph3 = GraphV4.create().initFromField(field3, Graph.create().getEdgeAdvancedCost);

    renderLRField(
        'Проблема: персонаж должен падать в отверстие в полу',
        fieldS3,
        'slide4',
        {
            nodes: false,
            lines: false,
            path: true,
            nodesCost: true,
            map: true
        },
        graph3,
        field3,
        SILENT
    );
};

export const slide5 = () => {
    const fieldS = `
▓ M              ▓
▓▓▓▓ ▓▓▓╡▓▓▓▓▓▓▓▓▓
▓       ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓
▓  ╡     ╡   $╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;

    const field = GameField.create().initFromText(fieldS);
    const graph = GraphV5.create().initFromField(field);

    renderLRField(
        'Персонаж должен падать в отверстие в полу - 1: добавляем разную стоимость перемещения по ребру в в зависимости от направления',
        fieldS,
        'V5',
        {
            nodes: false,
            lines: true,
            path: false,
            nodesCost: false,
            map: true
        },
        graph,
        field,
        SILENT
    );
};

export const slideV5_2 = () => {
    const fieldS = `
▓ M              ▓
▓▓▓▓ ▓▓▓▓╡▓▓▓▓▓▓▓▓
▓       ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓▓╡▓▓▓╡▓▓▓
▓  ╡     ╡   $╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;

    const field = GameField.create().initFromText(fieldS);
    const graph = GraphV5.create().initFromField(field);

    renderLRField(
        'Персонаж должен падать в отверстие в полу - 2: дорабатываем расчет доступности узлов',
        fieldS,
        'V5_2',
        {
            nodes: false,
            lines: true,
            path: false,
            nodesCost: true,
            map: true
        },
        graph,
        field,
        SILENT
    );
};

export const slideV5_3 = () => {
    const fieldS = `
▓ M              ▓
▓▓▓▓ ▓▓▓╡▓▓▓▓▓▓▓▓▓
▓       ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓
▓  ╡     ╡   $╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;

    const field = GameField.create().initFromText(fieldS);
    const graph = GraphV5.create().initFromField(field);

    renderLRField(
        'Персонаж должен падать в отверстие в полу - 3: правильная траектория',
        fieldS,
        'V5_3',
        {
            nodes: false,
            lines: false,
            path: true,
            nodesCost: false,
            map: true
        },
        graph,
        field,
        SILENT
    );
};

export const slideV5_4 = () => {
    const fieldS = `
▓     $          ▓
▓▓▓▓ ▓▓▓╡▓▓▓▓▓▓▓▓▓
▓ M     ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓
▓  ╡     ╡    ╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;

    const field = GameField.create().initFromText(fieldS);
    const graph = GraphV5.create().initFromField(field);

    renderLRField(
        'Проверка, разрешает ли алгоритм двигаться вверх через отверстие в потолке',
        fieldS,
        'V5_4',
        {
            nodes: false,
            lines: false,
            path: false,
            nodesCost: false,
            map: true
        },
        graph,
        field,
        SILENT
    );
};

export const slideV5_5 = () => {
    const fieldS = `
▓     $          ▓
▓▓▓▓ ▓▓▓╡▓▓▓▓▓▓▓▓▓
▓ M     ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓
▓  ╡     ╡    ╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;

    const field = GameField.create().initFromText(fieldS);
    const graph = GraphV5.create().initFromField(field);

    renderLRField(
        'Проверка, разрешает ли алгоритм двигаться вверх через отверстие в потолке',
        fieldS,
        'V5_5',
        {
            nodes: false,
            lines: false,
            path: true,
            nodesCost: true,
            map: true
        },
        graph,
        field,
        SILENT
    );
};

let app: AppController | null = null;
export const slideGame1 = () => {
    app = new AppController();
    app.run();
};

export const slide_finish = () => {
    const fieldS = `
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓                ▓
▓ ▓▓ ▓▓▓ ▓▓▓     ▓
▓ ▓  ▓ ▓ ▓ ▓     ▓
▓ ▓  ▓ ▓ ▓▓▓ ▓▓  ▓
▓ ▓  ▓ ▓ ▓ ▓     ▓
▓ ▓▓ ▓ ▓ ▓ ▓     ▓
▓             M  ▓
▓ ▓▓ ▓ ▓ ▓▓▓ ▓▓▓ ▓
▓ ▓  ▓ ▓ ▓   ▓ ▓ ▓
▓ ▓  ▓ ▓ ▓▓▓ ▓ ▓ ▓
▓ ▓  ▓▓▓ ▓ ▓ ▓$▓ ▓
▓ ▓▓ ▓ ▓ ▓▓▓ ▓▓▓ ▓
▓                ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 
`;

    const field = GameField.create().initFromText(fieldS);
    const graph = GraphV5.create().initFromField(field);

    const options = {
        nodes: false,
        lines: false,
        path: false,
        nodesCost: false,
        map: true
    };
    render(
        [
            <LRGameField
                field={field}
                graph={graph}
                render={options}
                id="finish"
                title=""
                canvasW={720}
                canvasH={600}
                showControls={false}
            />
        ],
        document.getElementById('finish')
    );
};
