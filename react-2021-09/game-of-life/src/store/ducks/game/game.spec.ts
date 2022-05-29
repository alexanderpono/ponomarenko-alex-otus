import { FillPercent, Mode, Size, sizeToWH, Speed } from '@src/consts';
import { bool, getFromState, getVal, str } from '@src/testFramework/lib/reducer';
import { CellInfo } from '@src/types';
import {
    AppAction,
    AppActions,
    AppState,
    defaultAppState,
    fieldSize,
    fillPercent,
    generation,
    invert,
    ioError,
    loadState,
    mode,
    replaceState,
    saveState,
    setCounter,
    setSpeed,
    user,
} from './game';
import gameReducer from './game';
import { getGOLCellState, getInverted, getNewField } from './playFieldUtils';

const num = (size: number) => Math.round(size * Math.random());

describe('gameReducer', () => {
    describe('gameReducer-parameterized', () => {
        const w = sizeToWH[Size.MIDDLE].w;
        const h = sizeToWH[Size.MIDDLE].h;
        const len = w * h;
        const id = num(len);
        const rndSize = (): Size => {
            const rndNum = num(2);
            const sizes = Object.keys(Size);
            const rndSize = sizes[rndNum];
            return rndSize as Size;
        };

        const rndPercent = (): FillPercent => {
            const keys = Object.keys(FillPercent);
            const index = Math.floor((keys.length - 1) * Math.random());
            const val = keys[index] as FillPercent;
            return val;
        };

        const rndS = rndSize();
        const badFieldSize = 'uuu' as unknown as Size;
        const rndP = rndPercent();
        const rndName = str();
        const rndAppState = { ...defaultAppState, userName: str() };
        const rndError = str();
        const nextData = getNewField(
            {
                data: defaultAppState.data,
                width: defaultAppState.fieldWidth,
                height: defaultAppState.fieldWidth,
            },
            getGOLCellState
        );
        const rndMode = bool() ? Mode.PLAY : Mode.PAUSE;
        const rndSpeed = ((): Speed => {
            const speedIndex = num(2);
            return speedIndex === 0 ? Speed.SLOW : speedIndex === 1 ? Speed.MEDIUM : Speed.FAST;
        })();
        const rndCounter = num(100);

        test.each`
            actions                                 | testName                                        | event                      | stateSelector    | value
            ${[fieldSize(Size.MIDDLE)]}             | ${'sets .fieldWidth from FIELD_SIZE action'}    | ${AppActions.FIELD_SIZE}   | ${'fieldWidth'}  | ${sizeToWH[Size.MIDDLE].w}
            ${[fieldSize(Size.LARGE)]}              | ${'sets .fieldHeight from FIELD_SIZE action'}   | ${AppActions.FIELD_SIZE}   | ${'fieldHeight'} | ${sizeToWH[Size.LARGE].h}
            ${[fieldSize(Size.MIDDLE)]}             | ${'sets .data from FIELD_SIZE action'}          | ${AppActions.FIELD_SIZE}   | ${'data.length'} | ${len}
            ${[fieldSize(rndS)]}                    | ${'sets .size from FIELD_SIZE action'}          | ${AppActions.FIELD_SIZE}   | ${'size'}        | ${rndS}
            ${[fieldSize(Size.MIDDLE), invert(id)]} | ${'sets .event from INVERT action'}             | ${AppActions.INVERT}       | ${null}          | ${null}
            ${[fieldSize(badFieldSize)]}            | ${'sets .size=SMALL from badFieldSize'}         | ${AppActions.FIELD_SIZE}   | ${'size'}        | ${Size.SMALL}
            ${[fillPercent(rndP)]}                  | ${'sets .fillPercent from FILL_PERCENT action'} | ${AppActions.FILL_PERCENT} | ${'fillPercent'} | ${rndP}
            ${[user(rndName)]}                      | ${'sets .userName from USER action'}            | ${AppActions.USER}         | ${'userName'}    | ${rndName}
            ${[loadState()]}                        | ${'sets .userName from LOAD_STATE action'}      | ${AppActions.LOAD_STATE}   | ${null}          | ${null}
            ${[saveState(rndAppState)]}             | ${'sets .userName from SAVE_STATE action'}      | ${AppActions.SAVE_STATE}   | ${null}          | ${null}
            ${[ioError(rndError)]}                  | ${'sets .userName from IO_ERROR action'}        | ${AppActions.IO_ERROR}     | ${'errorInfo'}   | ${rndError}
            ${[generation()]}                       | ${'sets .data from GENERATION action'}          | ${AppActions.GENERATION}   | ${'data'}        | ${nextData.data}
            ${[mode(rndMode)]}                      | ${'sets .mode from MODE action'}                | ${AppActions.MODE}         | ${'mode'}        | ${rndMode}
            ${[setSpeed(rndSpeed)]}                 | ${'sets .speed from SET_SPEED action'}          | ${AppActions.SET_SPEED}    | ${'speed'}       | ${rndSpeed}
            ${[setCounter(rndCounter)]}             | ${'sets .counter from SET_COUNTER action'}      | ${AppActions.SET_COUNTER}  | ${'counter'}     | ${rndCounter}
        `('$testName', async ({ actions, event, stateSelector, value }) => {
            let state: AppState = { ...defaultAppState, data: [...defaultAppState.data] };
            actions.forEach((action: AppAction) => {
                state = gameReducer(state, action);
            });
            expect(state.event).toEqual(event);
            if (stateSelector !== null) {
                expect(getFromState(state, stateSelector)).toEqual(getVal(actions, value));
            }
        });
    });

    it('inverts .visible of item(num) from INVERT action', () => {
        const srcState = defaultAppState;
        const id = Math.round((srcState.fieldWidth * srcState.fieldHeight - 1) * Math.random());
        const oldVisible = srcState.data[id];
        const inverted = getInverted(oldVisible);
        const state2 = gameReducer(srcState, invert(id));
        expect(state2.data[id]).toBe(inverted);
        expect(gameReducer(state2, invert(id)).data[id]).toBe(oldVisible);
    });

    it('sets state from REPLACE_STATE action', () => {
        const srcState = defaultAppState;
        const newState = { ...defaultAppState, name: str(), event: AppActions.REPLACE_STATE };
        const state2 = gameReducer(srcState, replaceState(newState));
        expect(state2.event).toEqual(AppActions.REPLACE_STATE);
        expect(state2).toEqual(newState);
    });

    it('returns original state from unknown action', () => {
        const srcState = defaultAppState;
        expect(gameReducer(srcState, { type: -1 } as unknown as AppAction)).toBe(srcState);
    });

    it('randomizes .data from FILL_PERCENT-25% action', () => {
        const srcState = defaultAppState;
        const expectedAliveNumber = Math.floor(srcState.fieldWidth * srcState.fieldHeight * 0.25);
        const newState = gameReducer(srcState, fillPercent(FillPercent.P25));
        const visibleCells = newState.data.filter((cell: CellInfo) => cell === CellInfo.alive);
        expect(visibleCells.length).toBe(expectedAliveNumber);
    });

    it('randomizes .data from FILL_PERCENT-50% action', () => {
        const srcState = defaultAppState;
        const expectedAliveNumber = Math.floor(srcState.fieldWidth * srcState.fieldHeight * 0.5);
        expect(
            gameReducer(srcState, fillPercent(FillPercent.P50)).data.filter(
                (cell: CellInfo) => cell === CellInfo.alive
            ).length
        ).toBe(expectedAliveNumber);
    });

    it('randomizes .data from FILL_PERCENT-75% action', () => {
        const srcState = defaultAppState;
        const expectedAliveNumber = Math.floor(srcState.fieldWidth * srcState.fieldHeight * 0.75);
        expect(
            gameReducer(srcState, fillPercent(FillPercent.P75)).data.filter(
                (cell: CellInfo) => cell === CellInfo.alive
            ).length
        ).toBe(expectedAliveNumber);
    });

    it('randomizes .data from FILL_PERCENT-100% action', () => {
        const srcState = defaultAppState;
        const expectedAliveNumber = Math.floor(srcState.fieldWidth * srcState.fieldHeight * 1);
        expect(
            gameReducer(srcState, fillPercent(FillPercent.P100)).data.filter(
                (cell: CellInfo) => cell === CellInfo.alive
            ).length
        ).toBe(expectedAliveNumber);
    });
});
