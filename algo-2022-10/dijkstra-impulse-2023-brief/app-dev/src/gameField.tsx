import './app.css';
import { ALL_NODES, GraphCalculator, SILENT } from './game/GraphCalculator';
import { GraphFromField } from './game/GraphFromField';
import { GraphCalculatorV2 } from './game/GraphCalculatorV2';
import { GraphCalculatorV3 } from './game/GraphCalculatorV3';
import { GraphFromFieldV2 } from './game/GraphFromFieldV2';
import { GameController } from './game/GameController';
import { GraphCalculatorV4 } from './game/GraphCalculatorV4';
import { GraphCalculatorV5c } from './game/GraphCalculatorV5c';
import { GraphCalculatorV5a } from './game/GraphCalculatorV5a';
import { GraphCalculatorV5b } from './game/GraphCalculatorV5b';
import { GraphCalculatorV5d } from './game/GraphCalculatorV5d';
import { GraphCalculatorV5e } from './game/GraphCalculatorV5e';
import { GraphCalculatorV5f } from './game/GraphCalculatorV5f';
import { RenderOptions, defaultRenderOptions } from './components/GameFieldUI/Game.types';
import { SupaController } from './game/SupaController';

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
const LINES: RenderOptions = { ...defaultRenderOptions, lines: true, showBtNodes: true };
const LINES_COST: RenderOptions = { ...defaultRenderOptions, lines: true, nodesCost: true };
const LINES_COST_PATH: RenderOptions = {
    ...defaultRenderOptions,
    lines: true,
    nodesCost: true,
    path: true
};
const LINES_COST_PATH_PROGRESS: RenderOptions = {
    ...defaultRenderOptions,
    lines: true,
    nodesCost: true,
    path: true,
    showProgress: true
};
const LINES_COST_PATH_MAP: RenderOptions = {
    ...defaultRenderOptions,
    lines: true,
    nodesCost: true,
    path: true,
    map: true,
    nodesShortCost: false
};
const LINES_COST_PATH_MAP_PROGRESS: RenderOptions = {
    ...defaultRenderOptions,
    lines: true,
    nodesCost: true,
    path: true,
    map: true,
    nodesShortCost: false,
    showProgress: true
};
const MAP: RenderOptions = { ...defaultRenderOptions, map: true };
const MAP_START_STOP: RenderOptions = { ...defaultRenderOptions, map: true, showBtStartStop: true };
const START_STOP: RenderOptions = { ...defaultRenderOptions, showBtStartStop: true };
const MAP_LINES: RenderOptions = { ...defaultRenderOptions, map: true, lines: true };
const MAP_COST: RenderOptions = { ...defaultRenderOptions, map: true, nodesCost: true };
const MAP_COST_PATH: RenderOptions = {
    ...defaultRenderOptions,
    map: true,
    nodesCost: true,
    path: true
};
const MAP_PATH: RenderOptions = { ...defaultRenderOptions, map: true, path: true };
const MAP_PATH_START_STOP: RenderOptions = {
    ...defaultRenderOptions,
    map: true,
    path: true,
    showBtStartStop: true
};
const SIMPLE = GraphFromField.getEdgeSimpleCost;
const ADVANCED = GraphFromField.getEdgeAdvancedCost;
const ADVANCED_V2 = GraphFromFieldV2.getEdgeAdvancedCost;
renderGameField(
    '',
    map1,
    'slide1',
    {
        ...LINES,
        nodesShortCost: false,
        showBtNodes: false
    },
    SIMPLE,
    GraphCalculator
);
renderGameField('', map1, 'slide2_2', MAP_LINES, ADVANCED, GraphCalculator);

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
renderGameField('', map2, 'slide3_2', MAP_PATH_START_STOP, ADVANCED, GraphCalculatorV2);

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
renderGameField('', map3, 'slide4_2', MAP_PATH, ADVANCED, GraphCalculatorV2);
renderGameField('', map3, 'V5_3', MAP_PATH_START_STOP, ADVANCED_V2, GraphCalculatorV3);

function renderGameField(
    title: string,
    map: string,
    target: string,
    options: RenderOptions,
    calcCost,
    calculator: typeof GraphCalculator,
    stepNo: number = ALL_NODES
) {
    new GameController(
        title,
        map,
        target,
        options,
        calcCost,
        calculator,
        SILENT,
        stepNo
    ).renderUI();
}
