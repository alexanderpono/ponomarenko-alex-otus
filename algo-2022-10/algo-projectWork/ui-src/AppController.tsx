import React from 'react';
import { render } from 'react-dom';
import { RenderOptions, SILENT } from './Graph';
import { GameField, Point2D } from './GameField';
import { GraphV5 } from './GraphV5';
import { AppUI } from './components/AppUI';
import { GRField } from './GR/GRField';
import { GRGraph } from './GR/GRGraph';
import { ManAni } from './GR/GR.types';
import { GRMan } from './GR/GRMan';

const fieldS = `
▓     $         ▓
▓▓▓▓ ▓▓▓╡▓▓▓▓▓▓▓▓
▓ M     ╡       ▓
▓▓▓▓▓▓▓▓▓▓▓▓╡▓▓▓▓
▓           ╡   ▓
▓▓▓╡▓▓▓▓▓╡▓▓▓▓╡▓▓
▓  ╡     ╡    ╡ ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    `;

export class AppController {
    field: GameField;
    emptyField: GameField;
    graph: GraphV5;
    pic;
    manXY: Point2D;
    manVIndex: number;
    nextManVIndex: number;
    manAni: ManAni = ManAni.STAND;
    curPathPos = 0;

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
                            console.error('onMount()');
                            resolve(true);
                        }}
                    />
                ],
                document.getElementById('game1')
            );
        });
    };

    onHtmlUIReady = () => {
        console.error('onHtmlUIReady()');
    };

    onBtStartClick = () => {
        console.error('onBtStartClick()');
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
        this.manXY = this.field.vertexIndexToCoords(mIndex, this.field.getWidth());
        console.error('run() this.manXY=', this.manXY);
        this.graph.calcVerticesCost(mIndex, dIndex, SILENT).calcCheapestPath(mIndex, dIndex);

        Promise.all([this.loadPic(), this.renderUI()]).then(() => {
            console.error('pic loaded & UI ready');
            this.renderLoop();
        });
    };

    stepNo = 0;
    renderLoop = () => {
        if (
            this.nextManVIndex !== this.manVIndex &&
            this.curPathPos < this.graph.cheapestPath.length
        ) {
            this.manVIndex = this.nextManVIndex;
            this.manXY = this.field.vertexIndexToCoords(this.manVIndex, this.field.getWidth());
            this.curPathPos++;
        }
        this.calcMan();
        this.renderScene();
        this.stepNo++;
        if (this.stepNo <= 10) {
            setTimeout(() => this.renderLoop(), 2000);
        }
    };

    calcMan = () => {
        console.error('calcMan() this.graph.cheapestPath=', this.graph.cheapestPath);
        if (this.curPathPos >= this.graph.cheapestPath.length) {
            return;
        }
        const curEdgeIndex = this.graph.cheapestPath[this.curPathPos];
        const edge = this.graph.edges[curEdgeIndex];
        console.error('calcMan() edge=', edge);
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
            this.manAni = ManAni.STAND;
        }
        if (direction === 'left' && v1xy.x > v0xy.x) {
            this.nextManVIndex = edge.vertex0;
            this.manAni = ManAni.LEFT;
        }
        console.log('this.curPathPos=', this.curPathPos);
        console.log('curEdgeIndex=', curEdgeIndex);
        console.log('edge=', edge);
        console.log('edgeOrientation=', edgeOrientation);
        console.log('this.manAni=', this.manAni);

        console.log('this.manVIndex=', this.manVIndex);
        console.log('this.nextManVIndex=', this.nextManVIndex);
        console.log('direction=', direction);
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
            path: true,
            nodesCost: false,
            map: true
        };
        GRField.create(context, this.emptyField, this.pic, options).draw();
        GRGraph.create(context, this.field, this.graph, options).draw();
        GRMan.create(context, this.manXY, this.manAni, this.pic).draw();
    };
}
