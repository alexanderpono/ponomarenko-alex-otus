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
renderGameField(GROUP_2, map1, 'slide2', MAP_START_STOP, ADVANCED, GraphCalculator);
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
renderGameField(GROUP_3, map2, 'slide3a', MAP_START_STOP, ADVANCED, GraphCalculator);
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
renderGameField(GROUP_4, map2, 'slide3', MAP_START_STOP, ADVANCED, GraphCalculatorV2);
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
const GROUP_5 = '3. Персонаж должен падать в отверстие в полу';
renderGameField(GROUP_5, map3, 'slide4', MAP_START_STOP, ADVANCED, GraphCalculatorV2);
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
renderGameField(GROUP_5, map3, 'V5_3', MAP_PATH_START_STOP, ADVANCED_V2, GraphCalculatorV3);

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
renderGameField(GROUP_6, map4, 'V5_4', MAP_START_STOP, ADVANCED_V2, GraphCalculatorV3);
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

// const GROUP_7 = '3. Результат';
// renderGameField(GROUP_7, map4, 'game1', MAP, ADVANCED_V2, GraphCalculatorV3);

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
renderGameField(
    '4. Алгоритм Дейкстры. Результат расчета графа',
    map5,
    'V5_7_1',
    LINES_COST_PATH,
    SIMPLE,
    GraphCalculatorV2,
    ALL_NODES
);
renderGameField(
    '4. Алгоритм Дейкстры. В конце шага 1',
    map5,
    'V5_7_2',
    LINES_COST_PATH,
    SIMPLE,
    GraphCalculatorV2,
    1
);
renderGameField(
    '4. Алгоритм Дейкстры. В конце шага 2',
    map5,
    'V5_7_3',
    LINES_COST_PATH,
    SIMPLE,
    GraphCalculatorV2,
    3
);
renderGameField(
    '4. Алгоритм Дейкстры. В конце шага 3',
    map5,
    'V5_7_4',
    LINES_COST_PATH,
    SIMPLE,
    GraphCalculatorV2,
    4
);
renderGameField(
    '4. Оптимизация вычислений: ранний выход',
    map5,
    'V5_7_5',
    LINES_COST_PATH_PROGRESS,
    SIMPLE,
    GraphCalculatorV4,
    ALL_NODES
);
renderGameField(
    '4. Стоимость перехода в вершину с учетом эвристики',
    map5,
    'V5_heurisic_1',
    LINES_COST_PATH_PROGRESS,
    SIMPLE,
    GraphCalculatorV5a,
    ALL_NODES
);
renderGameField(
    '4. Стоимость перехода. Увеличиваем вес H()*100',
    map5,
    'V5_heurisic_2',
    LINES_COST_PATH_PROGRESS,
    SIMPLE,
    GraphCalculatorV5b,
    ALL_NODES
);
renderGameField(
    '4. Эвристика H1() при выборе следующей вершины',
    map5,
    'V5_heurisic_3',
    LINES_COST_PATH_PROGRESS,
    SIMPLE,
    GraphCalculatorV5c,
    ALL_NODES
);
renderGameField(
    '4. Выбор следующей вершины. H2() = H1()*2',
    map5,
    'V5_heurisic_4',
    LINES_COST_PATH_PROGRESS,
    SIMPLE,
    GraphCalculatorV5d,
    ALL_NODES
);
renderGameField(
    '4. Эвристика H3(): учитываем отклонение от прямой',
    map5,
    'V5_heurisic_5',
    LINES_COST_PATH_PROGRESS,
    SIMPLE,
    GraphCalculatorV5e,
    ALL_NODES
);

renderGameField(
    '4. Эвристика H3(): учитываем отклонение от прямой',
    map5,
    'V5_heurisic_5_2',
    LINES_COST_PATH_PROGRESS,
    SIMPLE,
    GraphCalculatorV5e,
    ALL_NODES
);

const map6 = `
▓                ▓
▓                ▓
▓   M            ▓
▓       ▓        ▓
▓       ▓        ▓
▓       ▓        ▓
▓           $    ▓
▓                ▓
`;
renderGameField(
    '4. Добавляем барьер',
    map6,
    'V5_barrier',
    LINES_COST_PATH_MAP_PROGRESS,
    ADVANCED,
    GraphCalculatorV5e,
    ALL_NODES
);

const map7 = `
▓                ▓
▓                ▓
▓   M            ▓
▓       ▓        ▓
▓       ▓        ▓
▓       ▓        ▓
▓       ▓   $    ▓
▓       ▓        ▓
`;
renderGameField(
    '4. Сплошной барьер снизу',
    map7,
    'V5_barrier2',
    LINES_COST_PATH_MAP_PROGRESS,
    ADVANCED,
    GraphCalculatorV5e,
    ALL_NODES
);

const map8 = `
▓       ▓        ▓
▓       ▓        ▓
▓   M   ▓        ▓
▓       ▓        ▓
▓       ▓        ▓
▓       ▓        ▓
▓       ▓   $    ▓
▓       ▓        ▓
`;
renderGameField(
    '4. Проходим сквозь стену',
    map8,
    'V5_barrier3',
    LINES_COST_PATH_MAP_PROGRESS,
    ADVANCED,
    GraphCalculatorV5e,
    ALL_NODES
);

const map9 = `
▓                ▓
▓         ▓▓     ▓
▓          ▓     ▓
▓   M      ▓     ▓
▓          ▓ $   ▓
▓          ▓     ▓
▓       ▓▓▓▓     ▓
▓                ▓
`;
renderGameField(
    '4. Другой барьер',
    map9,
    'V5_barrier4',
    LINES_COST_PATH_MAP_PROGRESS,
    ADVANCED,
    GraphCalculatorV5e,
    ALL_NODES
);

const map10 = `
▓                ▓
▓         ▓▓     ▓
▓          ▓     ▓
▓   M      ▓     ▓
▓          ▓ $   ▓
▓          ▓     ▓
▓       ▓▓▓▓     ▓
▓                ▓
`;
renderGameField(
    '4. H4() - эвристика с новыми коэффициентами',
    map10,
    'V5_barrier5',
    LINES_COST_PATH_MAP_PROGRESS,
    ADVANCED,
    GraphCalculatorV5f,
    ALL_NODES
);

const map11 = `
▓                ▓
▓       ▓▓▓▓     ▓
▓          ▓     ▓
▓   M      ▓     ▓
▓          ▓ $   ▓
▓          ▓     ▓
▓       ▓▓▓▓     ▓
▓                ▓
`;
renderGameField(
    '4. Барьер: меняем форму препятствия',
    map11,
    'V5_barrier6',
    LINES_COST_PATH_MAP_PROGRESS,
    ADVANCED,
    GraphCalculatorV5f,
    ALL_NODES
);

renderGameField(
    '5. Алгоритм Дейкстры. Результат расчета графа',
    map5,
    'O_1',
    LINES_COST_PATH,
    SIMPLE,
    GraphCalculatorV2,
    ALL_NODES
);

renderGameField(
    '5. A* с эвристикой H4()',
    map5,
    'O_2',
    LINES_COST_PATH_PROGRESS,
    SIMPLE,
    GraphCalculatorV5f,
    ALL_NODES
);

renderSupaField('И наконец...', map5, 'game2', START_STOP, SIMPLE, GraphCalculatorV5f, ALL_NODES);

function renderSupaField(
    title: string,
    map: string,
    target: string,
    options: RenderOptions,
    calcCost,
    calculator: typeof GraphCalculator,
    stepNo: number = ALL_NODES
) {
    new SupaController(
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
