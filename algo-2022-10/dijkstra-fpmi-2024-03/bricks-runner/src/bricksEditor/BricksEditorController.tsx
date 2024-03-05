import { BricksEditorUI } from '@src/components/BricksEditorUI';
import {
    RenderOptions,
    defaultGameState,
    defaultRenderOptions
} from '@src/components/GameFieldUI/Game.types';
import { GameController } from '@src/game/GameController';
import { Cell, GameField, defaultPoint2D } from '@src/game/GameField';
import { ALL_NODES, COST_WALL } from '@src/game/GraphCalculator';
import { GraphFromField } from '@src/game/GraphFromField';
import { GraphFromFieldAdvancedV2 } from '@src/game/GraphFromFieldAdvancedV2';
import React from 'react';
import { render } from 'react-dom';
import { ManAni, SPRITE_HEIGHT, SPRITE_WIDTH } from '@src/ports/GR.types';
import { MapStorageService } from '@src/services/MapStrorageService';
import { GraphFromFieldAdvanced } from '@src/game/GraphFromFieldAdvanced';
import { GraphCalculatorV3 } from '@src/game/GraphCalculatorV3';
import { GraphCalculatorV5f } from '@src/game/GraphCalculatorV5f';
import {
    DynamicObject,
    GameScreen,
    InventoryItem,
    LevelStats,
    LevelsApiAnswer,
    Render,
    defaultLevelsApiAnswer
} from './BricksEditorController.types';
import { ResultsStorageService } from '@src/services/ResultsStorageService';
import { GameControllerBuilder } from '@src/game/GameControllerBuilder';
import { GRCoin } from '@src/ports/GRCoin';
import { GRGraph } from '@src/ports/GRGraph';
import { GRGold } from '@src/ports/GRGold';

const TELEPORT_CONTROLS: RenderOptions = {
    ...defaultRenderOptions,
    map: true,
    path: false,
    lines: false,
    nodesCost: false,
    showBtMap: true,
    showBtNodes: true,
    showBtEdges: true,
    showBtPath: true,
    showBtCost: true,
    showBtStartStop: true
};

const SIMPLE = new GraphFromField();
const ADVANCED = new GraphFromFieldAdvanced();
const ADVANCED_V2 = new GraphFromFieldAdvancedV2();
export class BricksEditorController extends GameController {
    options: RenderOptions = { ...TELEPORT_CONTROLS };
    curChar: string = Cell.wall;
    private mapStorage: MapStorageService = null;
    private resultsStorage: ResultsStorageService = null;
    private isDevelopMope = false;
    private levelsAnswer: LevelsApiAnswer = { ...defaultLevelsApiAnswer };
    private levelIndex = 0;
    private inventory: InventoryItem[] = [];
    private dObjects: DynamicObject[] = [];
    private gold: DynamicObject;
    private levelStats: LevelStats[] = [];
    private coinsTaken = 0;
    private levelTime = 0;
    private screen: GameScreen = GameScreen.level;
    private pathIsFound = true;

    constructor() {
        super(
            new GameControllerBuilder()
                .setTarget('target')
                .setOptions({ ...TELEPORT_CONTROLS })
                .setGraphBuilder(ADVANCED_V2)
                .setCalculator(GraphCalculatorV3)
                .setVerbose(false)
                .setMaxStepNo(ALL_NODES)
                .setCanvasW(1440)
                .setCanvasH(760)
        );
        this.mapStorage = new MapStorageService();
        this.resultsStorage = new ResultsStorageService();
        this.graphBuilder = ADVANCED_V2;
        this.gameState = {
            ...defaultGameState,
            nodesChecked: this.options.nodes,
            linesChecked: this.options.lines,
            pathChecked: this.options.path,
            nodesCostChecked: this.options.nodesCost,
            nodesShortCost: this.options.nodesShortCost,
            mapChecked: this.options.map,
            showControls: true,
            pic: new Image(),
            goldScreenXY: { ...defaultPoint2D },
            manScreenXY: { ...defaultPoint2D },
            miniCounter: 0,
            manAni: ManAni.STAND,
            highlightCells: this.options.highlightCells,
            maxCalcStep: this.stepNo,
            showBtNodes: this.options.showBtNodes,
            showBtEdges: this.options.showBtEdges,
            showBtStartStop: this.options.showBtStartStop,
            showBtPath: this.options.showBtPath,
            showBtCost: this.options.showBtCost,
            showProgress: this.options.showProgress
        };
        this.onRouteChanged();
        this.showButtonsIfDevelopMode();
    }

    getWhatToRender = (): number => {
        let whatToRender = 0;
        if (this.isDevelopMope) {
            whatToRender = whatToRender | Render.developControls | Render.gameScreen;
        } else {
            switch (this.screen) {
                case GameScreen.intro: {
                    whatToRender = whatToRender | Render.introScreen;
                    break;
                }
                case GameScreen.levelIntro: {
                    whatToRender = whatToRender | Render.levelIntroScreen;
                    break;
                }
                case GameScreen.level: {
                    whatToRender = whatToRender | Render.gameScreen;
                    whatToRender = whatToRender | Render.gameLevelControls | Render.levelStats;
                    break;
                }
                case GameScreen.finishLevel: {
                    whatToRender = whatToRender | Render.gameScreen;
                    whatToRender = whatToRender | Render.finishLevelScreen;
                    break;
                }
                case GameScreen.gameOver: {
                    whatToRender = whatToRender | Render.gameOverScreen;
                    break;
                }
            }
        }
        return whatToRender;
    };

    showButtonsIfDevelopMode = () => {
        if (!this.isDevelopMope) {
            this.patchState({
                showBtMap: false,
                showBtNodes: false,
                showBtEdges: false,
                showBtStartStop: false,
                showBtPath: false,
                showBtCost: false
            });
        } else {
            this.patchState({
                showBtMap: true,
                showBtNodes: true,
                showBtEdges: true,
                showBtStartStop: true,
                showBtPath: true,
                showBtCost: true
            });
        }
    };

    go = () => {
        this.installHashListener();
        this.processHash(this.getHash());
        this.map = this.mapStorage.getDefaultMap();
        this.calcField();
        this.renderUI();

        if (!this.isDevelopMope) {
            this.loadGame();
        }
    };

    onUIMounted() {
        super.onUIMounted();
        this.canvasRef.current.addEventListener('click', this.handleCanvasClick);
    }

    onUIUnmounted() {
        this.canvasRef.current.removeEventListener('click', this.handleCanvasClick);
    }

    handleCanvasClick = (evt: MouseEvent) => {
        const x = evt.offsetX;
        const y = evt.offsetY;
        const cellX = Math.floor(x / SPRITE_WIDTH);
        const cellY = Math.floor(y / SPRITE_HEIGHT);
        const lines = this.map.trim().split('\n');
        const line = lines[cellY];
        const lineAr = line.split('');
        const curVal = lineAr[cellX];

        if (!this.isDevelopMope && curVal === this.curChar) {
            return;
        }
        const notDeletable = [Cell.man, Cell.gold, Cell.coin];
        if (!this.isDevelopMope && notDeletable.indexOf(curVal as Cell) >= 0) {
            return;
        }
        if (!this.isDevelopMope) {
            const currentInventoryItem = this.inventory.find(
                (item: InventoryItem) => item.char === this.curChar
            );
            if (!currentInventoryItem) {
                console.error(
                    `Cannot find inventory item "${this.curChar}" in inventory`,
                    this.inventory
                );
                return;
            }
            console.log('currentInventoryItem=', currentInventoryItem);
            if (currentInventoryItem.count > 0) {
                currentInventoryItem.count--;
            } else {
                console.log(`No items "${this.curChar}" left in inventory`);
                return;
            }
        }

        const newVal = curVal === this.curChar ? Cell.space : this.curChar;
        lineAr[cellX] = newVal;
        lines[cellY] = lineAr.join('');
        const newMap = lines.join('\n');
        this.map = newMap;

        this.calcField();
        this.renderScene();
    };

    renderUI = () => {
        render(
            <BricksEditorUI
                id={this.target}
                title={this.title}
                canvasW={this.canvasW}
                canvasH={this.canvasH}
                ref={this.canvasRef}
                ctrl={this}
                gameState={this.gameState}
                curPathPos={this.curPathPos}
                shellState={{
                    isDevelopMope: this.isDevelopMope,
                    curPathPos: this.curPathPos,
                    inventory: this.inventory,
                    levelIndex: this.levelIndex,
                    curChar: this.curChar,
                    levelStats: this.levelStats,
                    coinsTaken: this.coinsTaken,
                    levelTime: this.levelTime,
                    render: this.getWhatToRender(),
                    levels: this.levelsAnswer.levels,
                    pathIsFound: this.pathIsFound
                }}
            />,
            document.getElementById('bricksEditor')
        );
    };

    handleClickBtBrick = () => {
        this.curChar = Cell.wall;
        this.renderUI();
    };
    handleClickBtStairs = () => {
        this.curChar = Cell.stairs;
        this.renderUI();
    };
    handleClickBtGold = () => {
        this.curChar = Cell.gold;
        this.renderUI();
    };
    handleClickBtSpace = () => {
        this.curChar = Cell.space;
        this.renderUI();
    };
    handleClickBtCoin = () => {
        this.curChar = Cell.coin;
        this.renderUI();
    };
    onUploadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let file: File | null = e.target.files ? e.target.files[0] : null;

        if (typeof file?.name !== 'string') {
            console.log('onUploadFileChange(): unrecognized data');
            return;
        }
        try {
            this.mapStorage.readMap(file).then((map: string) => {
                this.map = map;
                this.calcField();
                this.renderScene();
            });
        } catch (e) {
            console.error('onUploadFileChange() e=', e);
        }
        e.target.value = '';
    };

    handleClickBtSaveAs = () => {
        this.mapStorage.saveMap(this.map);
    };

    onUpdateCurPathPos = () => {
        this.renderUI();
    };

    loadLevels = (): Promise<LevelsApiAnswer> => {
        return this.mapStorage.loadLevels();
    };

    loadGame = () => {
        this.loadLevels().then((levelsAnswer: LevelsApiAnswer) => {
            this.levelsAnswer = levelsAnswer;
            this.loadLevel(this.levelIndex).then((map) => {
                this.onLoadLevel(this.levelIndex, map);
            });
        });
    };
    onLoadLevel = (levelIndex: number, map: string) => {
        this.map = map.trim();
        this.inventory = [...this.levelsAnswer.levels[levelIndex].inventory];
        this.curChar = this.inventory[0].char;
        this.levelTime = 0;
        this.calcField();
        this.renderScene();
        this.onBtClearClick();
        if (!this.isDevelopMope) {
            this.startTimer();
        }
    };

    wait = (millisec: number): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, millisec);
        });
    };

    getMapForLevel = (levelLndex: number): Promise<string> => {
        const levelInfo = this.levelsAnswer.levels[levelLndex];
        return this.mapStorage.getMapFromHttpFile(`./data/${levelInfo.mapFile}`);
    };

    loading = false;
    loadLevel = async (levelLndex: number) => {
        this.loading = true;
        const levelMap = await this.getMapForLevel(levelLndex);
        console.log('loadLevel() levelMap=', levelMap);
        this.loading = false;
        return levelMap;
    };

    handleClickIsDevelopMode = () => {
        this.isDevelopMope = !this.isDevelopMope;
        this.showButtonsIfDevelopMode();

        if (!this.isDevelopMope) {
            this.loadGame();
        } else {
            this.stopTimer();
            this.resetTimer();
        }

        this.renderUI();
    };

    handleSelectInventoryItem = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.curChar = evt.target.value;
        this.renderUI();
    };

    calcField = () => {
        super.calcField();

        const getDynanicObjects = (field: GameField): DynamicObject[] => {
            const dynamicTypes = [Cell.gold, Cell.man, Cell.coin];
            const h = field.field.length;
            const w = field.field[0].length;
            const result: DynamicObject[] = [];
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const cell = field.field[y][x];
                    const pos = dynamicTypes.findIndex((type) => type === cell);
                    if (pos >= 0) {
                        result.push({ point: { x, y }, type: cell });
                    }
                }
            }
            return result;
        };

        this.dObjects = getDynanicObjects(this.gameField);

        const gold = this.dObjects.find((dObject) => dObject.type === Cell.gold);
        if (typeof gold === 'object') {
            this.gold = gold;
        }
    };

    checkCollisions() {
        if (this.gold.point.x === this.manFieldXY.x && this.gold.point.y === this.manFieldXY.y) {
            this.onGoldCollision();
        }
        const coins = this.dObjects.filter((obj: DynamicObject) => obj.type === Cell.coin);
        coins.forEach((coin: DynamicObject, index) => {
            if (coin.point.x === this.manFieldXY.x && coin.point.y === this.manFieldXY.y) {
                this.onCoinCollision(coin);
            }
        });
    }

    removeCapturedCoinFromMap = (coin: DynamicObject) => {
        const newDObjects = this.dObjects.filter(
            (obj: DynamicObject) =>
                obj?.point?.x !== coin?.point?.x || obj?.point?.y !== coin?.point?.y
        );
        this.dObjects = newDObjects;
    };

    onCoinCollision = (coin: DynamicObject) => {
        this.removeCapturedCoinFromMap(coin);
        this.coinsTaken++;
        this.renderUI();
    };

    onGoldCollision = () => {
        const goldDObject = this.dObjects.find(
            (obj) =>
                obj.point.x === this.gameState.goldScreenXY.x &&
                obj.point.y === this.gameState.goldScreenXY.y
        );
        this.removeCapturedCoinFromMap(goldDObject);
        this.renderScene();
        this.saveLevelStats();
        if (this.levelIndex < this.levelsAnswer.levels.length - 1) {
            setTimeout(() => {
                this.screen = GameScreen.finishLevel;
                this.renderUI();
            }, 1000);
        } else {
            setTimeout(() => {
                this.gotoEndGame();
            }, 1000);
        }
    };

    onBtNextLevelClick = () => {
        this.levelIndex++;
        this.screen = GameScreen.levelIntro;
        this.renderUI();
    };

    saveLevelStats = () => {
        this.levelStats.push({
            steps: this.curPathPos,
            coins: this.coinsTaken,
            time: this.levelTime
        });
        console.log('saveLevelStats() this.levelStats=', this.levelStats);
    };
    gotoNewLevel = () => {
        console.log('gotoNewLevel()');
        this.screen = GameScreen.level;
    };

    gotoEndGame = () => {
        this.screen = GameScreen.gameOver;
        console.log('end()');
        this.renderUI();
    };

    onSendResultsClick = () => {
        this.screen = GameScreen.intro;
        this.renderUI();
    };

    renderObjects = (context: CanvasRenderingContext2D, options: RenderOptions) => {
        super.renderObjects(context, options);
        const coins = this.dObjects.filter((obj: DynamicObject) => obj.type === Cell.coin);
        coins.forEach((coin: DynamicObject) => {
            GRCoin.create(context, coin.point, this.gameState.pic).draw();
        });
        const golds = this.dObjects.filter((obj: DynamicObject) => obj.type === Cell.gold);
        golds.forEach((gold: DynamicObject) => {
            GRGold.create(context, gold.point, this.gameState.pic).draw();
        });
    };

    isTimerStarted = false;
    startTimer = () => {
        if (this.isTimerStarted) {
            return;
        }
        this.isTimerStarted = true;
        this.subsribeNextSecond();
    };
    stopTimer = () => {
        this.isTimerStarted = false;
    };
    resetTimer = () => (this.levelTime = 0);
    subsribeNextSecond = () => {
        setTimeout(this.onNextSecond, 1000);
    };
    onNextSecond = () => {
        if (this.isTimerStarted) {
            this.levelTime++;
            this.subsribeNextSecond();
            this.renderUI();
        }
    };

    getAccessCostOfGold = (): number => {
        const goldVertex = GRGraph.create(
            null,
            this.gameField,
            this.graph,
            this.options
        ).getVertexAt(this.gameState.goldScreenXY.x, this.gameState.goldScreenXY.y);
        return goldVertex.accessCost;
    };

    onBtStartClick = () => {
        const goldAccessCost = this.getAccessCostOfGold();
        const pathIsThroughWall = goldAccessCost > COST_WALL;
        if (pathIsThroughWall && !this.isDevelopMope) {
            this.saveLevelStats();
            this.pathIsFound = false;
            this.screen = GameScreen.finishLevel;
            this.stopTimer();
            this.renderUI();
            return;
        }
        this.pathIsFound = true;
        this.stopTimer();
        super.onBtStartClick();
    };

    onBtToLevel1 = () => {
        this.levelIndex = 0;
        this.screen = GameScreen.levelIntro;
        this.renderUI();
    };
    gotoLevel = (index: number) => {
        this.screen = GameScreen.level;
        this.levelTime = 0;
        this.levelIndex = index;
        this.coinsTaken = 0;
        this.levelStats = [];
        this.loadGame();
    };

    getHash = () => window.location.hash;
    processHash = (hash: string) => {
        this.isDevelopMope = hash === '#dev';
    };

    onRouteChanged = () => {
        this.processHash(this.getHash());
    };

    installHashListener = () => {
        window.addEventListener('hashchange', this.onRouteChanged);
    };
}
