import React from 'react';
import { render } from 'react-dom';
import { RenderOptions, SILENT } from './Graph';
import { GameField, Point2D } from './GameField';
import { GraphV5 } from './GraphV5';
import { AppUI } from './components/AppUI';
import { GRField } from './GR/GRField';
import { GRGraph } from './GR/GRGraph';
import { ManAni, SPRITE_HEIGHT, SPRITE_WIDTH } from './GR/GR.types';
import { GRMan } from './GR/GRMan';
import { GRGold } from './GR/GRGold';

const fieldS = `
▓     $          ▓
▓▓▓▓ ▓▓▓╡▓▓▓▓▓▓▓▓▓
▓ M     ╡        ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓▓
▓           ╡    ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓▓
▓  ╡     ╡    ╡  ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;

export class AppController {
    field: GameField;
    emptyField: GameField;
    graph: GraphV5;
    pic;
    manScreenXY: Point2D;
    goldScreenXY: Point2D;
    manFieldXY: Point2D;
    nextManFieldXY: Point2D;
    manVIndex: number;
    nextManVIndex: number;
    manAni: ManAni = ManAni.STAND;
    curPathPos = 0;
    w: number;
    pathChecked = false;

    loadPic = () => {
        return new Promise((resolve) => {
            this.pic = new Image();
            this.pic.src = 'sprite.png';
            this.pic.onload = function () {
                resolve(true);
            };
        });
    };

    renderUI = (): Promise<boolean> => {
        return new Promise((resolve) => {
            render(
                [
                    <AppUI
                        ctrl={this}
                        title="Результат"
                        onMount={() => {
                            resolve(true);
                        }}
                        pathChecked={this.pathChecked}
                    />
                ],
                document.getElementById('game1')
            );
        });
    };

    onBtStartClick = () => {
        this.manAni = ManAni.RIGHT;
        this.tick();
    };

    onBtClearClick = () => {
        this.stepNo = 0;
        this.miniCounter = 0;
        this.maxMiniCounter = 9;
        this.manAni = ManAni.STAND;
        const mIndex = this.graph.getVertexIndex(fieldS, 'M');
        this.manVIndex = mIndex;
        this.nextManVIndex = mIndex;
        this.curPathPos = 0;

        this.doTrajectoryStep();
        this.manFieldXY = this.field.vertexIndexToCoords(mIndex, this.w);
        this.nextManFieldXY = this.field.vertexIndexToCoords(this.nextManVIndex, this.w);
        this.calcManScreenPos();

        this.manAni = ManAni.STAND;
        this.renderScene();
    };

    run = () => {
        const getEmptyField = (s: string): string => {
            let s2 = s.replace('$', ' ');
            s2 = s2.replace('M', ' ');
            return s2;
        };
        const emptyField = getEmptyField(fieldS);

        this.emptyField = GameField.create().initFromText(emptyField);
        this.field = GameField.create().initFromText(fieldS);
        this.graph = GraphV5.create().initFromField(this.field);

        const mIndex = this.graph.getVertexIndex(fieldS, 'M');
        const dIndex = this.graph.getVertexIndex(fieldS, '$');
        this.manVIndex = mIndex;
        this.nextManVIndex = mIndex;
        this.curPathPos = 0;
        this.w = this.field.getWidth();
        this.graph.calcVerticesCost(mIndex, dIndex, SILENT).calcCheapestPath(mIndex, dIndex);

        this.doTrajectoryStep();
        this.manFieldXY = this.field.vertexIndexToCoords(mIndex, this.w);
        this.nextManFieldXY = this.field.vertexIndexToCoords(this.nextManVIndex, this.w);
        this.calcManScreenPos();
        this.goldScreenXY = this.field.vertexIndexToCoords(dIndex, this.w);

        Promise.all([this.loadPic(), this.renderUI()]).then(() => {
            console.error('pic loaded & UI ready');
            this.manAni = ManAni.STAND;
            this.renderScene();
        });
    };

    calcManScreenPos = () => {
        const deltaX = this.nextManFieldXY.x - this.manFieldXY.x;
        const deltaY = this.nextManFieldXY.y - this.manFieldXY.y;
        this.manScreenXY = {
            x: (this.manFieldXY.x + (deltaX / 10) * (this.miniCounter % 10)) * SPRITE_WIDTH,
            y: (this.manFieldXY.y + (deltaY / 10) * (this.miniCounter % 10)) * SPRITE_HEIGHT
        };
    };
    stepNo = 0;
    miniCounter = 0;
    maxMiniCounter = 9;
    tick = () => {
        if ((this.miniCounter + 1) % 10 === 0) {
            if (this.curPathPos < this.graph.cheapestPath.length) {
                this.curPathPos++;
                this.stepNo++;
            }
            this.manVIndex = this.nextManVIndex;
            this.doTrajectoryStep();
            this.manFieldXY = this.field.vertexIndexToCoords(this.manVIndex, this.w);
            this.nextManFieldXY = this.field.vertexIndexToCoords(this.nextManVIndex, this.w);

            this.miniCounter++;
            this.calcManScreenPos();
            this.renderScene();
        } else {
            this.miniCounter++;
            this.calcManScreenPos();
            this.renderScene();
        }
        if (this.stepNo < 10) {
            setTimeout(() => this.tick(), 25);
        } else {
            this.manAni = ManAni.STAND;
            this.renderScene();
        }
    };

    doTrajectoryStep = () => {
        if (this.curPathPos >= this.graph.cheapestPath.length) {
            return;
        }
        const curEdgeIndex = this.graph.cheapestPath[this.curPathPos];
        const edge = this.graph.edges[curEdgeIndex];
        const v0xy = this.field.vertexIndexToCoords(edge.vertex0, this.field.getWidth());
        const v1xy = this.field.vertexIndexToCoords(edge.vertex1, this.field.getWidth());
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

        if (direction === 'right') {
            this.nextManVIndex = edge.vertex1;
            this.manAni = ManAni.RIGHT;
        }
        if (direction === 'up' && v1xy.y > v0xy.y) {
            this.nextManVIndex = edge.vertex0;
            this.manAni = ManAni.STAIRS;
        }
        if (direction === 'left' && v1xy.x > v0xy.x) {
            this.nextManVIndex = edge.vertex0;
            this.manAni = ManAni.LEFT;
        }
    };

    renderScene = () => {
        const canvas = document.getElementById('AppUI-canvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.fillStyle = 'orange';
        context.strokeStyle = '#FF0000';
        context.lineWidth = 3;
        context.strokeRect(0, 0, canvas.width, canvas.height);

        if (canvas === null || context === null) {
            return;
        }
        const options: RenderOptions = {
            nodes: false,
            lines: false,
            path: this.pathChecked,
            nodesCost: false,
            map: true
        };
        GRField.create(context, this.emptyField, this.pic, options).draw();
        GRGold.create(context, this.goldScreenXY, this.pic).draw();
        GRGraph.create(context, this.field, this.graph, options).draw();
        GRMan.create(context, this.manScreenXY, this.manAni, this.pic, this.miniCounter).draw();
    };

    pathClicked = () => {
        this.pathChecked = !this.pathChecked;
        this.renderUI();
        this.renderScene();
    };
}
