import React from 'react';
import { render } from 'react-dom';
import { ALL_NODES, GraphCalculator, SILENT } from './GraphCalculator';
import { GameState, RenderOptions, defaultGameState } from '@src/components/GameFieldUI/Game.types';
import { Cell, GameField, Point2D, defaultPoint2D } from './GameField';
import { ManAni, SPRITE_HEIGHT, SPRITE_WIDTH } from '@src/ports/GR.types';
import ImgSprite from '@src/components/GameFieldUI/sprite.png';
import { GameFieldUI } from '@src/components/GameFieldUI/GameFieldUI';
import { GraphFromField } from './GraphFromField';
import { AbstractGraph } from './Graph.types';

export class GameController {
    protected gameState: GameState;
    protected picLoaded: boolean = false;
    protected emptyField: GameField = GameField.create();
    protected manFieldXY: Point2D = { ...defaultPoint2D };
    protected nextManFieldXY: Point2D = { ...defaultPoint2D };
    protected graph: AbstractGraph = null;
    protected gameField: GameField = null;
    protected canvasW = 720;
    protected canvasH = 320;
    protected canvasRef: React.RefObject<HTMLCanvasElement>;
    protected w: number = 0;

    constructor(
        protected title: string,
        protected map: string,
        protected target: string,
        options: RenderOptions,
        protected graphBuilder: GraphFromField,
        protected calculator: typeof GraphCalculator,
        protected verbose: boolean,
        stepNo: number = ALL_NODES
    ) {
        this.gameState = {
            ...defaultGameState,
            nodesChecked: options.nodes,
            linesChecked: options.lines,
            pathChecked: options.path,
            nodesCostChecked: options.nodesCost,
            nodesShortCost: options.nodesShortCost,
            mapChecked: options.map,
            showControls: true,
            pic: new Image(),
            goldScreenXY: { ...defaultPoint2D },
            manScreenXY: { ...defaultPoint2D },
            miniCounter: 0,
            manAni: ManAni.STAND,
            highlightCells: options.highlightCells,
            maxCalcStep: stepNo,
            showBtNodes: options.showBtNodes,
            showBtEdges: options.showBtEdges,
            showBtStartStop: options.showBtStartStop,
            showBtPath: options.showBtPath,
            showBtCost: options.showBtCost,
            showProgress: options.showProgress
        };
        this.canvasRef = React.createRef<HTMLCanvasElement>();

        this.loadPic().then(() => {
            this.picLoaded = true;

            const getEmptyMap = (s: string): string => {
                let s2 = s.replace('$', ' ');
                s2 = s2.replace('M', ' ');
                return s2;
            };
            const emptyMap = getEmptyMap(this.map);
            const field = GameField.create().initFromText(emptyMap);
            this.emptyField = field;

            const gameField = GameField.create().initFromText(map);
            let graph = this.graphBuilder.graphFromField(gameField);
            const mIndex = this.graphBuilder.getVertexIndex(map, 'M');
            const dIndex = this.graphBuilder.getVertexIndex(map, '$');
            graph = new calculator().calculateGraph(
                graph,
                mIndex,
                dIndex,
                SILENT,
                stepNo,
                gameField
            );
            this.w = gameField.getWidth();
            const goldScreenXY = gameField.vertexIndexToCoords(dIndex, this.w);
            const manFieldXY = gameField.vertexIndexToCoords(mIndex, this.w);
            const manScreenXY = calcManScreenPos(
                manFieldXY,
                this.nextManFieldXY,
                this.gameState.miniCounter
            );

            this.graph = graph;
            this.gameField = gameField;
            this.manFieldXY = manFieldXY;
            this.gameState = {
                ...this.gameState,
                manScreenXY,
                goldScreenXY,
                curVertexIndex: graph.curVertexIndex
            };

            this.manVIndex = mIndex;
            this.nextManVIndex = mIndex;
            this.curPathPos = 0;

            this.renderUI();
        });
    }

    renderUI = () => {
        render(this.getUI(), document.getElementById(this.target));
    };

    getUI = () => (
        <GameFieldUI
            field={this.gameField}
            emptyField={this.emptyField}
            graph={this.graph}
            id={this.target}
            title={this.title}
            canvasW={this.canvasW}
            canvasH={this.canvasH}
            ref={this.canvasRef}
            canvas={this.canvasRef.current}
            ctrl={this}
            gameState={this.gameState}
            picLoaded={this.picLoaded}
        />
    );

    loadPic = () => {
        return new Promise((resolve) => {
            this.gameState.pic.src = ImgSprite;
            this.gameState.pic.onload = function () {
                resolve(true);
            };
        });
    };

    patchState = (mixin: Partial<GameState>) => (this.gameState = { ...this.gameState, ...mixin });
    nodesClicked = () => {
        this.patchState({ nodesChecked: !this.gameState.nodesChecked });
        this.renderUI();
    };
    linesClicked = () => {
        this.patchState({ linesChecked: !this.gameState.linesChecked });
        this.renderUI();
    };
    pathClicked = () => {
        this.patchState({ pathChecked: !this.gameState.pathChecked });
        this.renderUI();
    };
    nodesCostClicked = () => {
        this.patchState({ nodesCostChecked: !this.gameState.nodesCostChecked });
        this.renderUI();
    };
    mapClicked = () => {
        this.gameState = { ...this.gameState, mapChecked: !this.gameState.mapChecked };
        this.renderUI();
    };
    onBtStartClick = () => {
        this.patchState({ manAni: ManAni.RIGHT });
        this.doTrajectoryStep();
        this.nextManFieldXY = this.gameField.vertexIndexToCoords(this.nextManVIndex, this.w);
        this.tick();
    };
    onBtClearClick = () => {
        this.stepNo = 0;
        this.maxMiniCounter = 9;
        const mIndex = this.graphBuilder.getVertexIndex(this.map, 'M');
        this.manVIndex = mIndex;
        this.nextManVIndex = mIndex;
        this.curPathPos = 0;

        this.doTrajectoryStep();
        this.manFieldXY = this.gameField.vertexIndexToCoords(mIndex, this.w);
        this.nextManFieldXY = this.gameField.vertexIndexToCoords(this.nextManVIndex, this.w);
        const miniCounter = 0;
        const manScreenXY = calcManScreenPos(this.manFieldXY, this.nextManFieldXY, miniCounter);

        this.patchState({ miniCounter, manAni: ManAni.STAND, manScreenXY });
        this.renderUI();
    };

    stepNo = 0;
    maxMiniCounter = 9;
    curPathPos = 0;
    manVIndex: number;
    nextManVIndex: number;
    tick = () => {
        this.verbose &&
            console.log(
                'tick() this.miniCounter=',
                this.gameState.miniCounter,
                this.curPathPos,
                this.stepNo,
                this.manVIndex,
                this.nextManVIndex,
                this.gameState.manAni
            );
        if ((this.gameState.miniCounter + 1) % 10 === 0) {
            if (this.curPathPos < this.graph.cheapestPath.length) {
                this.curPathPos++;
                this.stepNo++;
            }
            this.manVIndex = this.nextManVIndex;
            this.doTrajectoryStep();
            this.manFieldXY = this.gameField.vertexIndexToCoords(this.manVIndex, this.w);
            this.nextManFieldXY = this.gameField.vertexIndexToCoords(this.nextManVIndex, this.w);

            const miniCounter = this.gameState.miniCounter + 1;
            const manScreenXY = calcManScreenPos(this.manFieldXY, this.nextManFieldXY, miniCounter);
            let manTargetScreenXY: Point2D = { ...defaultPoint2D };
            if (this.gameState.manAni === ManAni.TELEPORT) {
                manTargetScreenXY = {
                    x: this.nextManFieldXY.x * SPRITE_WIDTH,
                    y: this.nextManFieldXY.y * SPRITE_HEIGHT
                };
            }
            this.patchState({ manScreenXY, miniCounter, manTargetScreenXY });
            this.renderUI();
        } else {
            const miniCounter = this.gameState.miniCounter + 1;
            let manScreenXY = calcManScreenPos(this.manFieldXY, this.nextManFieldXY, miniCounter);
            let manTargetScreenXY: Point2D = { ...defaultPoint2D };
            if (this.gameState.manAni === ManAni.TELEPORT) {
                manScreenXY = {
                    x: this.manFieldXY.x * SPRITE_WIDTH,
                    y: this.manFieldXY.y * SPRITE_HEIGHT
                };
                manTargetScreenXY = {
                    x: this.nextManFieldXY.x * SPRITE_WIDTH,
                    y: this.nextManFieldXY.y * SPRITE_HEIGHT
                };
            }
            this.patchState({ manScreenXY, miniCounter, manTargetScreenXY });
            this.renderUI();
        }
        if (this.stepNo < this.graph.cheapestPath.length) {
            setTimeout(() => this.tick(), 25);
        } else {
            this.patchState({ manAni: ManAni.STAND });
            this.renderUI();
        }
    };

    doTrajectoryStep = () => {
        if (this.curPathPos >= this.graph.cheapestPath.length) {
            return;
        }
        const curEdgeIndex = this.graph.cheapestPath[this.curPathPos];
        const edge = this.graph.edges[curEdgeIndex];
        const v0xy = this.gameField.vertexIndexToCoords(edge.vertex0, this.gameField.getWidth());
        const v1xy = this.gameField.vertexIndexToCoords(edge.vertex1, this.gameField.getWidth());
        const v0Cell = this.gameField.coordsToCell(v0xy);
        const v1Cell = this.gameField.coordsToCell(v1xy);
        const edgeOrientation = v0xy.y === v1xy.y ? 'hor' : 'vert';
        let direction = '';
        if (edgeOrientation === 'hor' && v1xy.x > v0xy.x && this.manVIndex === edge.vertex0) {
            direction = 'right';
        }
        if (edgeOrientation === 'hor' && v1xy.x > v0xy.x && this.manVIndex === edge.vertex1) {
            direction = 'left';
        }
        if (edgeOrientation === 'vert' && v1xy.y > v0xy.y && this.manVIndex === edge.vertex0) {
            direction = 'down';
        }
        if (edgeOrientation === 'vert' && v1xy.y > v0xy.y && this.manVIndex === edge.vertex1) {
            direction = 'up';
        }
        this.verbose && console.log(`doTrajectoryStep() edge=`, edge, direction);
        this.verbose && console.log(`doTrajectoryStep() v1xy=`, v1xy, v0xy);

        if (direction === 'right') {
            this.nextManVIndex = edge.vertex1;
            this.patchState({ manAni: ManAni.RIGHT });
        }
        if (direction === 'up' && v1xy.y > v0xy.y) {
            this.nextManVIndex = edge.vertex0;
            this.patchState({ manAni: ManAni.STAIRS });
        }
        if (direction === 'left' && v1xy.x > v0xy.x) {
            this.nextManVIndex = edge.vertex0;
            this.patchState({ manAni: ManAni.LEFT });
        }
        if (direction === 'down' && v1xy.y > v0xy.y) {
            this.nextManVIndex = edge.vertex1;
            const cell1 = this.gameField.field[v0xy.y][v0xy.x];
            const cell2 = this.gameField.field[v1xy.y][v1xy.x];
            let manAni = ManAni.STAND;
            if (cell1 === Cell.stairs || cell2 === Cell.stairs) {
                manAni = ManAni.STAIRS;
            }
            this.patchState({ manAni });
        }

        if (v0Cell === Cell.teleport && v1Cell === Cell.teleport) {
            this.patchState({ manAni: ManAni.TELEPORT });
        }
        this.verbose &&
            console.log(
                `doTrajectoryStep() this.manVIndex="${this.manVIndex}"`,
                this.curPathPos,
                this.graph.cheapestPath.length,
                edgeOrientation,
                direction
            );
    };

    onMaxStepChange = (evt) => {
        console.log(evt.target.value);
        const maxStep = parseInt(evt.target.value);
        this.recalcGraph(maxStep);
        this.renderUI();
    };

    recalcGraph = (maxStep: number) => {
        this.patchState({ maxCalcStep: maxStep });
        let graph = this.graphBuilder.graphFromField(this.gameField);
        const mIndex = this.graphBuilder.getVertexIndex(this.map, 'M');
        const dIndex = this.graphBuilder.getVertexIndex(this.map, '$');
        graph = new this.calculator().calculateGraph(
            graph,
            mIndex,
            dIndex,
            SILENT,
            maxStep,
            this.gameField
        );

        this.graph = graph;
        this.gameState = {
            ...this.gameState,
            curVertexIndex: graph.curVertexIndex
        };
    };

    onBtToStartClick = () => {
        const maxStep = 1;
        this.recalcGraph(maxStep);
        this.renderUI();
    };
    onBtPrevClick = () => {
        const maxStep = this.gameState.maxCalcStep > 1 ? this.gameState.maxCalcStep - 1 : 1;
        this.recalcGraph(maxStep);
        this.renderUI();
    };
    onBtNextClick = () => {
        const maxStep =
            this.gameState.maxCalcStep < ALL_NODES ? this.gameState.maxCalcStep + 1 : ALL_NODES;
        this.recalcGraph(maxStep);
        this.renderUI();
    };
    onBtNextJumpClick = () => {
        const maxStep =
            this.gameState.maxCalcStep + 10 < ALL_NODES
                ? this.gameState.maxCalcStep + 10
                : ALL_NODES;
        this.recalcGraph(maxStep);
        this.renderUI();
    };
    onBtToFinishClick = () => {
        const maxStep = ALL_NODES;
        this.recalcGraph(maxStep);
        this.renderUI();
    };
}

function calcManScreenPos(manFieldXY: Point2D, nextManFieldXY: Point2D, miniCounter: number) {
    const deltaX = nextManFieldXY.x - manFieldXY.x;
    const deltaY = nextManFieldXY.y - manFieldXY.y;
    const manScreenXY = {
        x: (manFieldXY.x + (deltaX / 10) * (miniCounter % 10)) * SPRITE_WIDTH,
        y: (manFieldXY.y + (deltaY / 10) * (miniCounter % 10)) * SPRITE_HEIGHT
    };
    return manScreenXY;
}
