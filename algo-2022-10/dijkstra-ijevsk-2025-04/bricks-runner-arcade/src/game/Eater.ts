import { ManAni } from '@src/ports/GR/GR.types';
import { LevelMap, Point2D } from './LevelMap';
import { ALL_NODES, PathCalculator, SILENT } from '@src/path/PathCalculator';
import { GridFromMap } from '@src/path/GridFromMap';
import { Grid } from '@src/path/path.types';
import { Ani, Man } from './Man';
import { GuardState, defaultGuardState } from '@src/types/GuardState';

export class Eater {
    manFieldXY: Point2D;
    nextManFieldXY: Point2D;
    miniCounter: number;
    manAni: ManAni;
    grid: Grid;
    private guardState: GuardState = { ...defaultGuardState };

    constructor(
        private levelMap: LevelMap,
        private pathCalculator: PathCalculator,
        private gridBuilder: GridFromMap,
        manFieldXY: Point2D,
        private man: Man
    ) {
        this.miniCounter = 0;
        this.manFieldXY = { ...manFieldXY };
        this.nextManFieldXY = { ...manFieldXY };
        this.manAni = ManAni.STAND;
    }

    calculatePath = () => {
        let grid = this.gridBuilder.gridFromMap(this.levelMap);
        const mIndex = this.levelMap.coordToVertexIndex(this.manFieldXY);
        const dIndex = this.levelMap.coordToVertexIndex(this.man.manFieldXY);
        grid = this.pathCalculator.calculateGraph(
            grid,
            mIndex,
            dIndex,
            SILENT,
            ALL_NODES,
            this.levelMap
        );
        this.grid = grid;
    };

    stepRight = () => {
        this.miniCounter = 0;
        this.nextManFieldXY = { x: this.manFieldXY.x + 1, y: this.manFieldXY.y };
        this.manAni = ManAni.RIGHT;
        return Ani.RUNNING;
    };

    stepLeft = () => {
        this.miniCounter = 0;
        this.nextManFieldXY = { x: this.manFieldXY.x - 1, y: this.manFieldXY.y };
        this.manAni = ManAni.LEFT;
        return Ani.RUNNING;
    };

    stepDown = () => {
        this.miniCounter = 0;
        this.nextManFieldXY = { x: this.manFieldXY.x, y: this.manFieldXY.y + 1 };
        this.manAni = ManAni.DOWN;
        return Ani.RUNNING;
    };

    stepUp = () => {
        this.miniCounter = 0;
        this.nextManFieldXY = { x: this.manFieldXY.x, y: this.manFieldXY.y - 1 };
        this.manAni = ManAni.UP;
        return Ani.RUNNING;
    };

    doStep = (curPos: Point2D, nextPos: Point2D) => {
        if (nextPos.x < curPos.x) {
            return this.stepLeft();
        }
        if (nextPos.x > curPos.x) {
            return this.stepRight();
        }
        if (nextPos.y > curPos.y) {
            return this.stepDown();
        }
        if (nextPos.y < curPos.y) {
            return this.stepUp();
        }
        return Ani.STOPPED;
    };

    think = () => {
        this.calculatePath();
        const distance = this.grid.cheapestPath.length;
        if (this.guardState.run && distance > 0) {
            const nextEdgeIndex = this.grid.cheapestPath[0];
            const edge = this.grid.edges[nextEdgeIndex];
            const v0 = this.levelMap.vertexIndexToCoords(edge.vertex0);
            const v1 = this.levelMap.vertexIndexToCoords(edge.vertex1);
            const nextPos = v0.x === this.manFieldXY.x && v0.y === this.manFieldXY.y ? v1 : v0;
            return this.doStep(this.manFieldXY, nextPos);
        }
        return Ani.STOPPED;
    };

    tick = (): Ani => {
        if ((this.miniCounter + 1) % 10 === 0) {
            this.manFieldXY = { ...this.nextManFieldXY };
            this.manAni = ManAni.STAND;
            const guardState = this.think();
            return guardState;
        } else {
            const miniCounter = this.miniCounter + 1;
            this.miniCounter = miniCounter;
            return Ani.RUNNING;
        }
    };

    setState = (guardState: GuardState) => {
        this.guardState = guardState;
    };
}
