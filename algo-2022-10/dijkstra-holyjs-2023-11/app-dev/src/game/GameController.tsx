import React from 'react';
import { render } from 'react-dom';
import { RenderOptions } from '@src/components/GameFieldUI';
import { ALL_NODES, GraphCalculator, SILENT } from './GraphCalculator';
import { GameState, defaultGameState } from '@src/components/GameFieldUI/Game.types';
import { Cell, GameField, Point2D, defaultPoint2D } from './GameField';
import { ManAni, SPRITE_HEIGHT, SPRITE_WIDTH } from '@src/ports/GR.types';
import ImgSprite from '@src/components/GameFieldUI/sprite.png';
import { GameFieldUI } from '@src/components/GameFieldUI/GameFieldUI';
import { GraphFromField } from './GraphFromField';
import { AbstractGraph } from './Graph.types';

export class GameController {
    private gameState: GameState;
    private picLoaded: boolean = false;
    private emptyField: GameField = GameField.create();
    private manFieldXY: Point2D = { ...defaultPoint2D };
    private nextManFieldXY: Point2D = { ...defaultPoint2D };
    private graph: AbstractGraph = null;
    private gameField: GameField = null;
    private canvasW = 720;
    private canvasH = 320;
    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private w: number = 0;

    constructor(
        private title: string,
        private map: string,
        private target: string,
        options: RenderOptions,
        calcCost,
        calculator: typeof GraphCalculator,
        private verbose: boolean
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
            highlightCells: options.highlightCells
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
            let graph = new GraphFromField().graphFromField(gameField, calcCost);
            const mIndex = GraphFromField.getVertexIndex(map, 'M');
            const dIndex = GraphFromField.getVertexIndex(map, '$');
            graph = new calculator().calculateGraph(graph, mIndex, dIndex, SILENT, ALL_NODES);
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
            this.gameState.goldScreenXY = goldScreenXY;
            this.manFieldXY = manFieldXY;
            this.gameState.manScreenXY = manScreenXY;
            this.gameState = { ...this.gameState };

            this.manVIndex = mIndex;
            this.nextManVIndex = mIndex;
            this.curPathPos = 0;

            this.renderUI();
        });
    }

    renderUI = (): Promise<boolean> => {
        return new Promise((resolve) => {
            render(this.getUI(), document.getElementById(this.target));
        });
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
        const mIndex = GraphFromField.getVertexIndex(this.map, 'M');
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
                this.nextManVIndex
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
            this.patchState({ manScreenXY, miniCounter });
            this.renderUI();
        } else {
            const miniCounter = this.gameState.miniCounter + 1;
            const manScreenXY = calcManScreenPos(this.manFieldXY, this.nextManFieldXY, miniCounter);
            this.patchState({ manScreenXY, miniCounter });
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
        this.verbose &&
            console.log(
                `doTrajectoryStep() this.manVIndex="${this.manVIndex}"`,
                this.curPathPos,
                this.graph.cheapestPath.length,
                edgeOrientation,
                direction
            );
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
