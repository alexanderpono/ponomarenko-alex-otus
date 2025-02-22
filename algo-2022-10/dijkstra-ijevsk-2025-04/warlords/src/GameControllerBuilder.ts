import { CellToCost, defaultCellToCost } from './game/game.types';
import { Point2D } from './game/LevelMap';
import { defaultUnit, Unit } from './GameController.types';

export class GameControllerBuilder {
    target: string = '';
    canvasW: number = 0;
    canvasH: number = 0;
    canvasId: string;
    level: string;
    calculatePath: boolean = false;
    pathSrc: Point2D = { x: 0, y: 0 };
    pathDest: Point2D = { x: 0, y: 0 };
    showVertices: boolean = false;
    showEdges: boolean = false;
    showVerticesCost: boolean = false;
    showEdgesCost: boolean = false;
    showCurVertex: boolean = false;
    showPath: boolean = false;
    showPathControls: boolean = false;
    pathControlsTarget: string = '';
    maxCalcStep: number = 0;
    unit: Unit = defaultUnit;
    showUnit: boolean = false;
    cellToCost: CellToCost = defaultCellToCost;

    setTarget = (target: string) => {
        this.target = target;
        return this;
    };

    setCanvasW = (canvasW: number) => {
        this.canvasW = canvasW;
        return this;
    };

    setCanvasH = (canvasH: number) => {
        this.canvasH = canvasH;
        return this;
    };

    setCanvasId = (canvasId: string) => {
        this.canvasId = canvasId;
        return this;
    };

    setLevel = (level: string) => {
        this.level = level;
        return this;
    };

    setCalculatePath = (calculatePath: boolean) => {
        this.calculatePath = calculatePath;
        return this;
    };

    setPathSrc = (pathSrc: Point2D) => {
        this.pathSrc = pathSrc;
        return this;
    };

    setPathDest = (pathDest: Point2D) => {
        this.pathDest = pathDest;
        return this;
    };

    setShowVertices = (showVertices: boolean) => {
        this.showVertices = showVertices;
        return this;
    };

    setShowEdges = (showEdges: boolean) => {
        this.showEdges = showEdges;
        return this;
    };

    setShowVerticesCost = (showVerticesCost: boolean) => {
        this.showVerticesCost = showVerticesCost;
        return this;
    };

    setShowEdgesCost = (showEdgesCost: boolean) => {
        this.showEdgesCost = showEdgesCost;
        return this;
    };

    setShowCurVertex = (showCurVertex: boolean) => {
        this.showCurVertex = showCurVertex;
        return this;
    };

    setShowPath = (showPath: boolean) => {
        this.showPath = showPath;
        return this;
    };

    setShowPathControls = (showPathControls: boolean) => {
        this.showPathControls = showPathControls;
        return this;
    };

    setPathControlsTarget = (pathControlsTarget: string) => {
        this.pathControlsTarget = pathControlsTarget;
        return this;
    };

    setMaxCalcStep = (maxCalcStep: number) => {
        this.maxCalcStep = maxCalcStep;
        return this;
    };

    setUnit = (unit: Unit) => {
        this.unit = unit;
        return this;
    };

    setShowUnit = (showUnit: boolean) => {
        this.showUnit = showUnit;
        return this;
    };

    setCellToCost = (cellToCost: CellToCost) => {
        this.cellToCost = cellToCost;
        return this;
    };
}
