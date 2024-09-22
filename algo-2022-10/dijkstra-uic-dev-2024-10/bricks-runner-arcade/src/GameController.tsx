import React from 'react';
import { render } from 'react-dom';
import { UI } from './components/UI';
import ImgSprite from '@src/components/UI/sprite.png';
import { level1 } from './ports/levels/level1';
import { level2 } from './ports/levels/level2';
import { Cell, DynamicObject, LevelMap } from './game/LevelMap';
import { GRScene } from './ports/GR/GRScene';
import { Ani, Man, Scenario } from './game/Man';
import { GridFromMap } from './path/GridFromMap';
import { Eater } from './game/Eater';
import { Keyboard } from './ports/keyboard';
import { UIState, defaultUIState } from './types/UIState';
import { GuardState, defaultGuardState } from './types/GuardState';
import { ManState } from './types/ManState';
import { GameControllerBuilder } from './GameControllerBuilder';

export class GameController {
    picLoaded: boolean;
    levelMap: LevelMap = null;
    emptyLevel: LevelMap = null;
    pic: InstanceType<typeof Image> = new Image();
    man: Man;
    guard: Eater;
    private dObjects: DynamicObject[] = [];
    private isRunningTick: boolean = false;
    private kb: Keyboard = null;
    private uiState: UIState = {
        ...defaultUIState,
        showPath: true,
        showNodesCost: true,
        showMap: true,
        showLines: false
    };
    private guardState: GuardState = {
        ...defaultGuardState,
        run: false
    };
    private manState: GuardState = {
        ...defaultGuardState,
        run: true
    };

    constructor(private builder: GameControllerBuilder) {}

    run() {
        this.levelMap = LevelMap.create().initFromText(this.builder.level);
        this.emptyLevel = this.initEmptyField(this.builder.level);
        this.dObjects = this.levelMap.getDynanicObjects();
        this.kb = new Keyboard(this);
        this.kb.listen();
        this.renderUI();

        this.man = new Man(
            this.levelMap.charToCoords('M'),
            this.kb,
            this,
            'D',
            this.levelMap,
            new GridFromMap()
        );
        this.guard = new Eater(
            this.levelMap,
            this.builder.calculator,
            new GridFromMap(),
            this.levelMap.charToCoords('E'),
            this.man
        );

        this.loadPic().then(() => {
            this.picLoaded = true;
            this.guard.setState(this.guardState);
            this.man.setState(this.manState);
            const guardState = this.guard.think();
            const manState = this.man.think();
            this.renderScene();
            if (guardState === Ani.RUNNING) {
                this.runTick();
            }
            if (manState === Ani.RUNNING) {
                this.runTick();
            }
        });

        document.getElementById('btRight').addEventListener('click', () => {
            this.stepRight();
        });
        document.getElementById('btLeft').addEventListener('click', () => {
            this.stepLeft();
        });
        document.getElementById('btDown').addEventListener('click', () => {
            this.stepDown();
        });
        document.getElementById('btUp').addEventListener('click', () => {
            this.stepUp();
        });

        document.getElementById('btGRight').addEventListener('click', () => {
            this.gstepRight();
        });
        document.getElementById('btGLeft').addEventListener('click', () => {
            this.gstepLeft();
        });
        document.getElementById('btGDown').addEventListener('click', () => {
            this.gstepDown();
        });
        document.getElementById('btGUp').addEventListener('click', () => {
            this.gstepUp();
        });
    }
    loadPic = () => {
        return new Promise((resolve) => {
            this.pic.src = ImgSprite;
            this.pic.onload = function () {
                resolve(true);
            };
        });
    };

    renderScene(): CanvasRenderingContext2D {
        const context = GRScene.create().render(
            this.picLoaded,
            this.levelMap,
            this.pic,
            this.man,
            this.dObjects,
            this.guard.grid,
            this.guard,
            this.uiState,
            this.builder.canvasId
        );
        return context;
    }

    stepRight = () => {
        this.man.stepRight(Scenario.FIRST_PRESS);
        this.runTick();
    };

    stepLeft = () => {
        this.man.stepLeft(Scenario.FIRST_PRESS);
        this.runTick();
    };

    stepDown = () => {
        this.man.stepDown(Scenario.FIRST_PRESS);
        this.runTick();
    };

    stepUp = () => {
        this.man.stepUp(Scenario.FIRST_PRESS);
        this.runTick();
    };

    gstepRight = () => {
        this.guard.stepRight();
        this.runTick();
    };

    gstepLeft = () => {
        this.guard.stepLeft();
        this.runTick();
    };

    gstepDown = () => {
        this.guard.stepDown();
        this.runTick();
    };

    gstepUp = () => {
        this.guard.stepUp();
        this.runTick();
    };

    runTick = () => {
        if (this.isRunningTick) {
            return;
        }
        this.doTick();
    };

    doTick = () => {
        const manAnimationState = this.man.tick();
        const guardAnimationState = this.guard.tick();
        if (manAnimationState !== Ani.STOPPED || guardAnimationState !== Ani.STOPPED) {
            this.isRunningTick = true;
            setTimeout(() => this.doTick(), 100);
        } else {
            this.isRunningTick = false;
        }
        this.renderScene();
    };

    initEmptyField = (level: string): LevelMap => {
        const getEmptyMap = (s: string): string => {
            let s2 = s.replace('$', ' ');
            s2 = s2.replace('M', ' ');
            return s2;
        };
        const emptyMap = getEmptyMap(level);
        return LevelMap.create().initFromText(emptyMap);
    };

    renderUI = () => {
        render(
            <UI
                kb={this.kb}
                uiState={this.uiState}
                ctrl={this}
                guardState={this.guardState}
                manState={this.manState}
                canvasW={this.builder.canvasW}
                canvasH={this.builder.canvasH}
                canvasId={this.builder.canvasId}
            />,
            document.getElementById(this.builder.target)
        );
    };

    onKeyEvent = () => {
        this.man.onKeyEvent(Scenario.FIRST_PRESS);
        this.renderUI();
        this.runTick();
    };

    checkCollisions() {
        const golds = this.dObjects.filter((obj: DynamicObject) => obj.type === Cell.gold);
        golds.forEach((gold: DynamicObject, index) => {
            if (gold.point.x === this.man.manFieldXY.x && gold.point.y === this.man.manFieldXY.y) {
                this.onGoldCollision(gold);
            }
        });
    }

    onGoldCollision = (gold: DynamicObject) => {
        this.removeCapturedGoldFromMap(gold);
        this.renderUI();
    };

    removeCapturedGoldFromMap = (gold: DynamicObject) => {
        const newDObjects = this.dObjects.filter(
            (obj: DynamicObject) =>
                obj?.point?.x !== gold?.point?.x || obj?.point?.y !== gold?.point?.y
        );
        this.dObjects = newDObjects;
    };

    onManAniNewLoop = () => {
        this.checkCollisions();
    };

    patchState = (mixin: Partial<UIState>) => (this.uiState = { ...this.uiState, ...mixin });
    nodesClicked = () => {
        this.patchState({ showNodes: !this.uiState.showNodes });
        this.renderUI();
        this.renderScene();
    };
    linesClicked = () => {
        this.patchState({ showLines: !this.uiState.showLines });
        this.renderUI();
        this.renderScene();
    };
    pathClicked = () => {
        this.patchState({ showPath: !this.uiState.showPath });
        this.renderUI();
        this.renderScene();
    };
    nodesCostClicked = () => {
        this.patchState({ showNodesCost: !this.uiState.showNodesCost });
        this.renderUI();
        this.renderScene();
    };
    mapClicked = () => {
        this.patchState({ showMap: !this.uiState.showMap });
        this.renderUI();
        this.renderScene();
    };

    patchGState = (mixin: Partial<GuardState>) =>
        (this.guardState = { ...this.guardState, ...mixin });
    guardRunClicked = () => {
        this.patchGState({ run: !this.guardState.run });
        this.guard.setState(this.guardState);
        this.runTick();
        this.renderUI();
        this.renderScene();
    };

    patchMState = (mixin: Partial<ManState>) => (this.manState = { ...this.manState, ...mixin });
    manRunClicked = () => {
        this.patchMState({ run: !this.manState.run });
        this.man.setState(this.manState);
        this.runTick();
        this.renderUI();
        this.renderScene();
    };
}
