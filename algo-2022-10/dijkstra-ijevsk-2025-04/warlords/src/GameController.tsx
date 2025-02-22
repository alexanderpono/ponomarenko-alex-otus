import React from 'react';
import { render } from 'react-dom';
import ImgSprite from '@src/assets/sprite.png';
import { LevelMap } from './game/LevelMap';
import { GameControllerBuilder } from './GameControllerBuilder';
import { ImageBuilder } from './ports/ImageBuilder';
import { GridFromMap } from './path/GridFromMap';
import { Grid } from './path/path.types';
import { MapView } from './views/MapView';
import { VerticesView } from './views/VerticesView';
import { EdgesView } from './views/EdgesView';
import { EdgesCostView } from './views/EdgesCostView';
import { VerticesCostView } from './views/VerticesCostView';
import { ALL_NODES, PathCalculator, SILENT, VERBOSE } from './path/PathCalculator';
import { CurVertexView } from './views/CurVertexView';
import { PathView } from './views/PathView';
import { PathControls } from './components/PathControls';
import { UnitView } from './views/UnitView';

export class GameController {
    picLoaded: boolean;
    levelMap: LevelMap = null;
    pic: InstanceType<typeof Image> = new Image();
    grid: Grid = null;
    maxCalcStep: number = 1;
    graph: ImageBuilder = null;

    constructor(private builder: GameControllerBuilder) {}

    run() {
        this.maxCalcStep = this.builder.maxCalcStep;
        console.log('run() this.builder.level=', this.builder.level);
        this.levelMap = LevelMap.create().initFromText(this.builder.level);
        console.log('run() this.levelMap=', this.levelMap);

        this.loadPic().then(() => {
            this.picLoaded = true;
            this.calculatePath();
            this.renderScene();
            this.renderUI();
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

    renderScene() {
        this.graph = ImageBuilder.create()
            .setDomTarget(this.builder.target)
            .setSize(this.builder.canvasW, this.builder.canvasH)
            .createContext();

        this.graph.loadPic(ImgSprite, 'sprite').then(() => {
            this.innerRender();
        });

        return this;
    }

    innerRender = () => {
        this.graph.lineColor('black').lineWidth(1).border().font('bold 15px sans-serif');
        this.graph = new MapView().render(this.graph, this.levelMap);
        if (this.builder.showEdges) {
            this.graph = new EdgesView().render(this.graph, this.levelMap, this.grid);
        }
        if (this.builder.showVertices) {
            this.graph = new VerticesView().render(this.graph, this.levelMap, this.grid);
        }
        if (this.builder.showEdgesCost) {
            this.graph = new EdgesCostView().render(this.graph, this.levelMap, this.grid);
        }
        if (this.builder.showVerticesCost) {
            this.graph = new VerticesCostView().render(this.graph, this.levelMap, this.grid);
        }
        if (this.builder.showCurVertex) {
            this.graph = new CurVertexView().render(this.graph, this.levelMap, this.grid);
        }
        if (this.builder.showPath) {
            this.graph = new PathView().render(this.graph, this.levelMap, this.grid);
        }
        if (this.builder.showUnit) {
            this.graph = new UnitView().render(this.graph, this.builder.unit);
        }

        this.graph.buildImage(); //.printActions(145)
    };

    rerenderScene = () => {
        this.graph.clearActions();
        this.innerRender();
    };

    calculatePath = () => {
        const gridBuilder = new GridFromMap(this.builder.cellToCost);
        this.grid = gridBuilder.gridFromMap(this.levelMap);

        const srcIndex = this.levelMap.coordToVertexIndex(this.builder.pathSrc);
        const destIndex = this.levelMap.coordToVertexIndex(this.builder.pathDest);
        if (this.builder.calculatePath) {
            this.grid = new PathCalculator().calculateGraph(
                this.grid,
                srcIndex,
                destIndex,
                SILENT,
                this.maxCalcStep,
                this.levelMap
            );
        }
    };

    renderUI = () => {
        if (this.builder.showPathControls) {
            render(
                <PathControls ctrl={this} maxCalcStep={this.maxCalcStep} />,
                document.getElementById(this.builder.pathControlsTarget)
            );
        }
    };

    onBtToStartClick = () => {
        this.maxCalcStep = 0;
        this.updateUI();
    };

    updateUI = () => {
        this.calculatePath();
        this.renderUI();
        this.rerenderScene();
    };

    onBtPrevClick = () => {
        this.maxCalcStep--;
        this.updateUI();
    };

    onBtNextClick = () => {
        this.maxCalcStep++;
        this.updateUI();
    };

    onBtNextJumpClick = () => {
        this.maxCalcStep += 10;
        this.updateUI();
    };

    onBtToFinishClick = () => {
        this.maxCalcStep = ALL_NODES;
        this.updateUI();
    };

    onMaxStepChange = (evt) => {
        this.maxCalcStep = parseInt(evt.target.value);
        this.updateUI();
    };
}
