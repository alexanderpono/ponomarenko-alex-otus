import './app.css';
import { ALL_NODES, GraphCalculator, SILENT } from './game/GraphCalculator';
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
renderGameField(
    GROUP_1,
    map1,
    'slide1',
    {
        ...LINES,
        nodesShortCost: false
    },
    SIMPLE,
    GraphCalculator
);
renderGameField(
    GROUP_1,
    map1,
    'slide1_2',
    {
        ...LINES_COST,
        nodesShortCost: false
    },
    SIMPLE,
    GraphCalculator
);
renderGameField(
    GROUP_1,
    map1,
    'slide1_3',
    {
        ...LINES_COST_PATH,
        nodesShortCost: false
    },
    SIMPLE,
    GraphCalculator
);

const GROUP_2 = '3. Траектория движения с обходом препятствий';
renderGameField(GROUP_2, map1, 'slide2', MAP, ADVANCED, GraphCalculator);
renderGameField(GROUP_2, map1, 'slide2_2', MAP_LINES, ADVANCED, GraphCalculator);
renderGameField(
    GROUP_2,
    map1,
    'slide2_3',
    {
        ...MAP_COST,
        nodesShortCost: false,
        highlightCells: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 2, y: 1 },
            { x: 0, y: 2 }
        ]
    },
    ADVANCED,
    GraphCalculator
);
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
renderGameField(
    GROUP_3,
    map2,
    'slide3a_3',
    { ...MAP_COST_PATH, highlightCells: [{ x: 14, y: 4 }] },
    ADVANCED,
    GraphCalculator
);

const GROUP_4 = '3. Результат выбора оптимального пути';
renderGameField(GROUP_4, map2, 'slide3', MAP, ADVANCED, GraphCalculatorV2);
renderGameField(GROUP_4, map2, 'slide3_2', MAP_PATH, ADVANCED, GraphCalculatorV2);
renderGameField(
    GROUP_4,
    map2,
    'slide3_3',
    { ...MAP_COST_PATH, highlightCells: [{ x: 14, y: 4 }] },
    ADVANCED,
    GraphCalculatorV2
);

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
const GROUP_5 = '3. персонаж должен падать в отверстие в полу';
renderGameField(GROUP_5, map3, 'slide4', MAP, ADVANCED, GraphCalculatorV2);
renderGameField(GROUP_5, map3, 'slide4_2', MAP_PATH, ADVANCED, GraphCalculatorV2);
renderGameField(
    GROUP_5,
    map3,
    'slide4_3',
    { ...MAP_COST_PATH, highlightCells: [{ x: 5, y: 0 }] },
    ADVANCED,
    GraphCalculatorV2
);
renderGameField(
    GROUP_5,
    map3,
    'slide4_4',
    { ...MAP_LINES, highlightCells: [{ x: 4, y: 0 }] },
    ADVANCED,
    GraphCalculatorV2
);

renderGameField(
    GROUP_5,
    map3,
    'V5',
    { ...MAP_LINES, highlightCells: [{ x: 4, y: 0 }] },
    ADVANCED_V2,
    GraphCalculatorV3
);
renderGameField(
    GROUP_5,
    map3,
    'V5_2',
    { ...MAP_COST, highlightCells: [{ x: 5, y: 0 }] },
    ADVANCED_V2,
    GraphCalculatorV3
);
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
const GROUP_6 = '3. Персонаж не должен подниматься вверх <br/> по воздуху';
renderGameField(GROUP_6, map4, 'V5_4', MAP, ADVANCED_V2, GraphCalculatorV3);
renderGameField(
    GROUP_6,
    map4,
    'V5_4_1',
    { ...MAP_LINES, highlightCells: [{ x: 4, y: 2 }] },
    ADVANCED_V2,
    GraphCalculatorV3
);
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

const map5 = `
▓                 
                  
  M               
                  
                  
                  
            $     
                 ▓
`;
renderGameField('1', map5, 'V5_7_1', LINES_COST_PATH, SIMPLE, GraphCalculatorV2, ALL_NODES);
renderGameField('2', map5, 'V5_7_2', LINES_COST_PATH, SIMPLE, GraphCalculatorV2, 1);
renderGameField('3', map5, 'V5_7_3', LINES_COST_PATH, SIMPLE, GraphCalculatorV2, 3);
renderGameField('4', map5, 'V5_7_4', LINES_COST_PATH, SIMPLE, GraphCalculatorV2, 4);
renderGameField('5', map5, 'V5_7_5', LINES_COST_PATH, SIMPLE, GraphCalculatorV2, 5);
renderGameField('6', map5, 'V5_7_6', LINES_COST_PATH, SIMPLE, GraphCalculatorV2, 6);
renderGameField('7', map5, 'V5_7_7', LINES_COST_PATH, SIMPLE, GraphCalculatorV2, 7);
renderGameField('8', map5, 'V5_7_8', LINES_COST_PATH, SIMPLE, GraphCalculatorV2, 8);
renderGameField('9', map5, 'V5_7_9', LINES_COST_PATH, SIMPLE, GraphCalculatorV2, 9);
renderGameField('10', map5, 'V5_7_10', LINES_COST_PATH, SIMPLE, GraphCalculatorV2, 10);
renderGameField('11', map5, 'V5_7_11', LINES_COST_PATH, SIMPLE, GraphCalculatorV2, 11);
renderGameField('12', map5, 'V5_7_12', LINES_COST_PATH, SIMPLE, GraphCalculatorV2, 12);
renderGameField('13', map5, 'V5_7_13', LINES_COST_PATH, SIMPLE, GraphCalculatorV2, 13);
