import { Point2D, defaultPoint2D } from '@src/game/GameField';
import { ALL_NODES } from '@src/game/GraphCalculator';
import { ManAni } from '@src/ports/GR.types';

export interface GameFieldController {
    nodesClicked: () => void;
    linesClicked: () => void;
    pathClicked: () => void;
    nodesCostClicked: () => void;
    mapClicked: () => void;
    onBtStartClick: () => void;
    onBtClearClick: () => void;
    onMaxStepChange: (evt) => void;
}
export interface GameState {
    nodesChecked: boolean;
    linesChecked: boolean;
    pathChecked: boolean;
    nodesCostChecked: boolean;
    nodesShortCost: boolean;
    mapChecked: boolean;
    showControls: boolean;
    pic: InstanceType<typeof Image>;
    goldScreenXY: Point2D;
    manScreenXY: Point2D;
    manAni: ManAni;
    miniCounter: number;
    showBtMap: boolean;
    showBtNodes: boolean;
    highlightCells: Point2D[];
    maxCalcStep: number;
}
export const defaultGameState: GameState = {
    nodesChecked: false,
    linesChecked: false,
    pathChecked: false,
    nodesCostChecked: false,
    nodesShortCost: true,
    mapChecked: false,
    showControls: false,
    pic: null,
    goldScreenXY: { ...defaultPoint2D },
    manScreenXY: { ...defaultPoint2D },
    manAni: ManAni.STAND,
    miniCounter: 0,
    showBtMap: false,
    showBtNodes: false,
    highlightCells: [],
    maxCalcStep: ALL_NODES
};

export interface RenderOptions {
    nodes: boolean;
    lines: boolean;
    path: boolean;
    nodesCost: boolean;
    nodesShortCost: boolean;
    map: boolean;
    showBtMap: boolean;
    showBtNodes: boolean;
    highlightCells: Point2D[];
}
export const defaultRenderOptions: RenderOptions = {
    nodes: false,
    lines: false,
    path: false,
    nodesCost: false,
    nodesShortCost: false,
    map: false,
    showBtMap: false,
    showBtNodes: false,
    highlightCells: []
};
