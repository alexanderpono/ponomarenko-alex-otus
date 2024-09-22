import { ManAni } from '@src/ports/GR/GR.types';
import { Cell, LevelMap, Point2D } from './LevelMap';
import { Edge, Grid } from '@src/path/path.types';
import { IKeyboard } from '@src/ports/keyboard/Keyboard.types';
import { ManState, defaultManState } from '@src/types/ManState';
import { GridFromMap } from '@src/path/GridFromMap';

interface MainController {
    runTick: () => void;
    onManAniNewLoop: () => void;
}

export enum Ani {
    RUNNING = 'RUNNING',
    STOPPED = 'STOPPED'
}
export enum Scenario {
    FIRST_PRESS = 'FIRST_PRESS',
    CONTINUE_MOVEMENT = 'CONTINUE_MOVEMENT'
}
const CAN_GO = true;
const CANNOT_GO = false;

export class Man {
    manFieldXY: Point2D;
    nextManFieldXY: Point2D;
    miniCounter: number;
    manAni: ManAni;
    grid: Grid;
    state: Ani;
    private manState: ManState = { ...defaultManState };

    constructor(
        manFieldXY: Point2D,
        private kb: IKeyboard,
        private main: MainController,
        private moveCommands: string,
        private levelMap: LevelMap,
        private gridBuilder: GridFromMap
    ) {
        this.miniCounter = 0;
        this.manFieldXY = { ...manFieldXY };
        this.nextManFieldXY = { ...manFieldXY };
        this.manAni = ManAni.STAND;
        this.state = Ani.STOPPED;
        this.grid = this.gridBuilder.gridFromMap(this.levelMap);
    }

    stepRight = (scenario: Scenario) => {
        if (this.state === Ani.RUNNING && scenario === Scenario.FIRST_PRESS) {
            return;
        }
        const nextManFieldXY = { x: this.manFieldXY.x + 1, y: this.manFieldXY.y };
        if (this.canGoTo(nextManFieldXY)) {
            this.miniCounter = 0;
            this.nextManFieldXY = nextManFieldXY;
            this.aniRight();
            return CAN_GO;
        } else {
            console.log('cant go RIGHT');
            this.aniStand();
            return CANNOT_GO;
        }
    };

    stepLeft = (scenario: Scenario) => {
        if (this.state === Ani.RUNNING && scenario === Scenario.FIRST_PRESS) {
            return;
        }
        const nextManFieldXY = { x: this.manFieldXY.x - 1, y: this.manFieldXY.y };
        this.miniCounter = 0;
        if (this.canGoTo(nextManFieldXY)) {
            this.nextManFieldXY = nextManFieldXY;
            this.aniLeft();
            return CAN_GO;
        } else {
            console.log('cant go LEFT');
            this.aniStand();
            return CANNOT_GO;
        }
    };

    stepDown = (scenario: Scenario) => {
        if (this.state === Ani.RUNNING && scenario === Scenario.FIRST_PRESS) {
            return;
        }
        const nextManFieldXY = { x: this.manFieldXY.x, y: this.manFieldXY.y + 1 };

        this.miniCounter = 0;
        if (this.canGoTo(nextManFieldXY)) {
            this.nextManFieldXY = nextManFieldXY;
            this.aniDown();
            return CAN_GO;
        } else {
            console.log('cant go DOWN');
            this.aniStand();
            return CANNOT_GO;
        }
    };

    aniDown = () => {
        const cell = this.levelMap.coordsToCell(this.manFieldXY);
        const cellT = this.levelMap.coordsToCell(this.nextManFieldXY);
        if (cell === Cell.stairs || cellT === Cell.stairs) {
            this.manAni = ManAni.STAIRS;
        } else {
            this.manAni = ManAni.STAND;
        }
    };

    getEdgesOfVertex = (edges: Edge[], vertexIndex: number): number[] => {
        const edgesOfVertex = edges
            .map((edge: Edge, index: number) =>
                edge.vertex0 === vertexIndex || edge.vertex1 === vertexIndex ? index : -1
            )
            .filter((index) => index !== -1);
        return edgesOfVertex;
    };

    stepUp = (scenario: Scenario): boolean => {
        if (this.state === Ani.RUNNING && scenario === Scenario.FIRST_PRESS) {
            return;
        }

        const nextManFieldXY = { x: this.manFieldXY.x, y: this.manFieldXY.y - 1 };
        this.miniCounter = 0;
        if (this.canGoTo(nextManFieldXY)) {
            this.nextManFieldXY = nextManFieldXY;
            this.manAni = ManAni.STAIRS;
            return CAN_GO;
        } else {
            console.log('cant go UP');
            this.aniStand();
            return CANNOT_GO;
        }
    };

    aniStand = () => {
        const cell = this.levelMap.coordsToCell(this.manFieldXY);
        if (cell === Cell.pipe) {
            this.manAni = ManAni.PIPE_STAND;
        } else {
            this.manAni = ManAni.STAND;
        }
        this.state = Ani.STOPPED;
    };

    aniLeft = () => {
        const cell = this.levelMap.coordsToCell(this.manFieldXY);
        const cellT = this.levelMap.coordsToCell(this.nextManFieldXY);
        if (cell === Cell.pipe || cellT === Cell.pipe) {
            this.manAni = ManAni.PIPE_LEFT;
        } else {
            this.manAni = ManAni.LEFT;
        }
    };

    aniRight = () => {
        const cell = this.levelMap.coordsToCell(this.manFieldXY);
        const cellT = this.levelMap.coordsToCell(this.nextManFieldXY);
        if (cell === Cell.pipe || cellT === Cell.pipe) {
            this.manAni = ManAni.PIPE_RIGHT;
        } else {
            this.manAni = ManAni.RIGHT;
        }
    };

    canGoTo = (nextManFieldXY: Point2D) => {
        const mIndex = this.levelMap.coordToVertexIndex(this.manFieldXY);
        const dIndex = this.levelMap.coordToVertexIndex(nextManFieldXY);
        const edges = this.getEdgesOfVertex(this.grid.edges, mIndex);
        const edge = edges
            .map((edgeIndex: number) => this.grid.edges[edgeIndex])
            .filter(
                (edge: Edge) =>
                    (edge.vertex0 === mIndex && edge.vertex1 === dIndex) ||
                    (edge.vertex1 === mIndex && edge.vertex0 === dIndex)
            );
        const cost = edge[0].vertex0 === mIndex ? edge[0].cost.v0v1Cost : edge[0].cost.v1v0Cost;
        return cost === 1;
    };

    tick = (): Ani => {
        if ((this.miniCounter + 1) % 10 === 0) {
            this.manFieldXY = { ...this.nextManFieldXY };
            this.main.onManAniNewLoop();
            if (this.isKeypressed()) {
                if (this.onKeyEvent(Scenario.CONTINUE_MOVEMENT) === CAN_GO) {
                    this.main.runTick();
                }
                return this.state;
            } else {
                if (this.moveCommands.length) {
                    this.state = this.think();
                    return this.state;
                }
            }

            if (this.calcAutoFall()) {
                this.state = Ani.RUNNING;
            } else {
                this.aniStand();
                this.state = Ani.STOPPED;
            }
            return this.state;
        } else {
            const miniCounter = this.miniCounter + 1;
            this.miniCounter = miniCounter;
            this.state = Ani.RUNNING;
            return this.state;
        }
    };

    calcAutoFall = () => {
        const cell = this.levelMap.coordsToCell(this.manFieldXY);
        const nextManFieldXY = { x: this.manFieldXY.x, y: this.manFieldXY.y + 1 };
        const cellD = this.levelMap.coordsToCell(nextManFieldXY);
        if (cell === Cell.space && cellD === Cell.space) {
            if (this.canGoTo(nextManFieldXY)) {
                this.manAni = ManAni.STAND;
                this.stepDown(Scenario.CONTINUE_MOVEMENT);
                this.main.runTick();
                return true;
            }
        }

        return false;
    };

    onKeyEvent = (scenario: Scenario): boolean => {
        let move = false;
        if (this.kb.isUpPressed) {
            move = move || this.stepUp(scenario);
        }
        if (this.kb.isDownPressed) {
            move = move || this.stepDown(scenario);
        }
        if (this.kb.isRightPressed) {
            move = move || this.stepRight(scenario);
        }
        if (this.kb.isLeftPressed) {
            move = move || this.stepLeft(scenario);
        }
        return move;
    };

    isKeypressed = () =>
        this.kb.isUpPressed ||
        this.kb.isDownPressed ||
        this.kb.isRightPressed ||
        this.kb.isLeftPressed;

    think = (): Ani => {
        if (this.manState.run && this.moveCommands.length) {
            const commands = this.moveCommands.split('');
            const command = commands.shift();
            this.moveCommands = commands.join('');
            this.doMoveCommand(command);
            return Ani.RUNNING;
        }
        return Ani.STOPPED;
    };

    doMoveCommand = (cmd: string) => {
        switch (cmd) {
            case 'L':
                return this.stepLeft(Scenario.CONTINUE_MOVEMENT);
            case 'R':
                return this.stepRight(Scenario.CONTINUE_MOVEMENT);
            case 'U':
                return this.stepUp(Scenario.CONTINUE_MOVEMENT);
            case 'D':
                return this.stepDown(Scenario.CONTINUE_MOVEMENT);
        }
    };

    setState = (manState: ManState) => {
        this.manState = manState;
    };
}
