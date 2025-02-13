import React from 'react';
import { ManAni } from '@src/ports/GR.types';
import { GameController } from './GameController';
import { SupaFieldUI } from '@src/components/GameFieldUI/SupaFieldUI';

export class SupaController extends GameController {
    getUI = () => (
        <SupaFieldUI
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
            let manAni = ManAni.DOWN;
            this.patchState({ manAni });
        }
        if (direction === 'up' && v1xy.y > v0xy.y) {
            this.nextManVIndex = edge.vertex0;
            let manAni = ManAni.UP;
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
