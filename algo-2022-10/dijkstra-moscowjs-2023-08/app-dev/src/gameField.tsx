import './app.css';
import { GraphCalculator, SILENT } from './game/GraphCalculator';
import { GraphFromField } from './game/GraphFromField';
import { RenderOptions, defaultRenderOptions } from './components/GameFieldUI';
import { GraphCalculatorV2 } from './game/GraphCalculatorV2';
import { GraphCalculatorV3 } from './game/GraphCalculatorV3';
import { GraphFromFieldV2 } from './game/GraphFromFieldV2';
import { GameController } from './game/GameController';

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
const ADVANCED_V2 = GraphFromFieldV2.getEdgeAdvancedCost;
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
renderGameField(GROUP_5, map3, 'slide4_4', MAP_LINES, ADVANCED, GraphCalculatorV2);

renderGameField(GROUP_5, map3, 'V5', MAP_LINES, ADVANCED_V2, GraphCalculatorV3);
renderGameField(GROUP_5, map3, 'V5_2', MAP_COST, ADVANCED_V2, GraphCalculatorV3);
renderGameField(GROUP_5, map3, 'V5_3', MAP_PATH, ADVANCED_V2, GraphCalculatorV3);

const map4 = `
▓     $          ▓
▓▓▓▓ ▓▓▓╡▓▓▓▓▓▓▓▓▓
▓ M     ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓
▓  ╡     ╡    ╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;
const GROUP_6 = '3. Персонаж не должен подниматься вверх по воздуху';
renderGameField(GROUP_6, map4, 'V5_4', MAP, ADVANCED_V2, GraphCalculatorV3);
renderGameField(GROUP_6, map4, 'V5_4_1', MAP_LINES, ADVANCED_V2, GraphCalculatorV3);
renderGameField(GROUP_6, map4, 'V5_5', MAP_COST, ADVANCED_V2, GraphCalculatorV3);
renderGameField(GROUP_6, map4, 'V5_6', MAP_COST_PATH, ADVANCED_V2, GraphCalculatorV3);

const GROUP_7 = '3. Результат';
renderGameField(GROUP_7, map4, 'game1', MAP, ADVANCED_V2, GraphCalculatorV3);

function renderGameField(
    title: string,
    map: string,
    target: string,
    options: RenderOptions,
    calcCost,
    calculator: typeof GraphCalculator
) {
    new GameController(title, map, target, options, calcCost, calculator, SILENT).renderUI();
}
