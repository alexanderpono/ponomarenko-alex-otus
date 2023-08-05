import React from 'react';
import { render } from 'react-dom';
import './app.css';
import { ALL_NODES, GraphCalculator, SILENT } from './game/GraphCalculator';
import { GameField } from './game/GameField';
import { GraphFromField } from './game/GraphFromField';
import { GameFieldUI, RenderOptions, defaultRenderOptions } from './components/GameFieldUI';
import { GraphCalculatorV2 } from './game/GraphCalculatorV2';

console.log('gameField!');

const map1 = `
▓ M              ▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓▓
▓       ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓  ╡         $   ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
`;
const LINES = { ...defaultRenderOptions, lines: true };
const LINES_COST = { ...defaultRenderOptions, lines: true, nodesCost: true };
const LINES_COST_PATH = { ...defaultRenderOptions, lines: true, nodesCost: true, path: true };
const MAP = { ...defaultRenderOptions, map: true };
const MAP_LINES = { ...defaultRenderOptions, map: true, lines: true };
const MAP_COST = { ...defaultRenderOptions, map: true, nodesCost: true };
const MAP_COST_PATH = { ...defaultRenderOptions, map: true, nodesCost: true, path: true };
const MAP_PATH = { ...defaultRenderOptions, map: true, path: true };
const SIMPLE = GraphFromField.getEdgeSimpleCost;
const ADVANCED = GraphFromField.getEdgeAdvancedCost;
const GROUP_1 = '2. Квадратная сетка';
renderGameField(GROUP_1, map1, 'slide1', LINES, SIMPLE, GraphCalculator);
renderGameField(GROUP_1, map1, 'slide1_2', LINES_COST, SIMPLE, GraphCalculator);
renderGameField(GROUP_1, map1, 'slide1_3', LINES_COST_PATH, SIMPLE, GraphCalculator);

const GROUP_2 = '3. Траектория движения с обходом препятствий';
renderGameField(GROUP_2, map1, 'slide2', MAP, ADVANCED, GraphCalculator);
renderGameField(GROUP_2, map1, 'slide2_2', MAP_LINES, ADVANCED, GraphCalculator);
renderGameField(GROUP_2, map1, 'slide2_3', MAP_COST, ADVANCED, GraphCalculator);
renderGameField(GROUP_2, map1, 'slide2_4', MAP_COST_PATH, ADVANCED, GraphCalculator);

const map2 = `
▓ M              ▓
▓▓▓▓▓▓▓▓╡▓▓▓▓▓▓▓▓▓
▓       ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓
▓  ╡     ╡   $╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;
const GROUP_3 = '3. Ошибка реализации: не нашел оптимальный путь';
renderGameField(GROUP_3, map2, 'slide3a', MAP, ADVANCED, GraphCalculator);
renderGameField(GROUP_3, map2, 'slide3a_2', MAP_PATH, ADVANCED, GraphCalculator);
renderGameField(GROUP_3, map2, 'slide3a_3', MAP_COST_PATH, ADVANCED, GraphCalculator);

const GROUP_4 = '3. Результат выбора оптимального пути';
renderGameField(GROUP_4, map2, 'slide3', MAP, ADVANCED, GraphCalculatorV2);
renderGameField(GROUP_4, map2, 'slide3_2', MAP_PATH, ADVANCED, GraphCalculatorV2);
renderGameField(GROUP_4, map2, 'slide3_3', MAP_COST_PATH, ADVANCED, GraphCalculatorV2);

const map3 = `
▓ M              ▓
▓▓▓▓ ▓▓▓╡▓▓▓▓▓▓▓▓▓
▓       ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓
▓  ╡     ╡   $╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;
const GROUP_5 = '3. Задача: персонаж должен падать в отверстие в полу';
renderGameField(GROUP_5, map3, 'slide4', MAP, ADVANCED, GraphCalculatorV2);
renderGameField(GROUP_5, map3, 'slide4_2', MAP_PATH, ADVANCED, GraphCalculatorV2);
renderGameField(GROUP_5, map3, 'slide4_3', MAP_COST_PATH, ADVANCED, GraphCalculatorV2);
renderGameField(GROUP_5, map3, 'slide4_3', MAP_COST_PATH, ADVANCED, GraphCalculatorV2);
renderGameField(GROUP_5, map3, 'slide4_4', MAP_LINES, ADVANCED, GraphCalculatorV2);

function renderGameField(
    title: string,
    map: string,
    target: string,
    options: RenderOptions,
    calcCost,
    calculator: typeof GraphCalculator
) {
    const gameField = GameField.create().initFromText(map);
    let graph = new GraphFromField().graphFromField(gameField, calcCost);

    const mIndex = GraphFromField.getVertexIndex(map, 'M');
    const dIndex = GraphFromField.getVertexIndex(map, '$');
    graph = new calculator().calculateGraph(graph, mIndex, dIndex, SILENT, ALL_NODES);

    render(
        <GameFieldUI field={gameField} graph={graph} render={options} id={target} title={title} />,
        document.getElementById(target)
    );
}
