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
    onBtToStartClick: () => void;
    onBtPrevClick: () => void;
    onBtNextClick: () => void;
    onBtNextJumpClick: () => void;
    onBtToFinishClick: () => void;
    onUIMounted: () => void;
    onUIUnmounted: () => void;
    handleClickBtBrick?: () => void;
    handleClickBtStairs?: () => void;
    handleClickBtGold?: () => void;
    handleClickBtSpace?: () => void;
    handleClickBtCoin?: () => void;
    onUploadFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClickBtSaveAs?: () => void;
    handleClickIsDevelopMode?: () => void;
    handleSelectInventoryItem?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSendResultsClick?: () => void;
    onBtToLevel1?: () => void;
    onBtNextLevelClick?: () => void;
    gotoLevel?: (levelNumber: number) => void;
    gotoLevelIntro?: () => void;
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
    manTargetScreenXY: Point2D;
    manAni: ManAni;
    miniCounter: number;
    showBtMap: boolean;
    showBtNodes: boolean;
    showBtEdges: boolean;
    showBtStartStop: boolean;
    showBtPath: boolean;
    showBtCost: boolean;
    showProgress: boolean;
    highlightCells: Point2D[];
    maxCalcStep: number;
    curVertexIndex: number;
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
    manTargetScreenXY: { ...defaultPoint2D },
    manAni: ManAni.STAND,
    miniCounter: 0,
    showBtMap: false,
    showBtNodes: false,
    showBtEdges: false,
    showBtStartStop: false,
    showBtPath: false,
    showBtCost: false,
    showProgress: false,
    highlightCells: [],
    maxCalcStep: ALL_NODES,
    curVertexIndex: 0
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
    showBtEdges: boolean;
    showBtStartStop: boolean;
    showBtPath: boolean;
    showBtCost: boolean;
    showProgress: boolean;
    curVertexIndex: number;
    highlightCells: Point2D[];
}
export const defaultRenderOptions: RenderOptions = {
    nodes: false,
    lines: false,
    path: false,
    nodesCost: false,
    nodesShortCost: true,
    map: false,
    showBtMap: false,
    showBtNodes: false,
    showBtEdges: false,
    showBtStartStop: false,
    showBtPath: false,
    showBtCost: false,
    showProgress: false,
    curVertexIndex: 0,
    highlightCells: []
};
