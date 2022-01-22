import { FillPercent, Size, sizeToWH } from '@src/consts';
import { getFromState, getVal, str } from '@src/testFramework/lib/reducer';
import { CellInfo } from '@src/types';
import {
    AppAction,
    AppActions,
    AppState,
    clear,
    defaultAppState,
    fieldSize,
    fillPercent,
    invert,
    loadState,
    replaceState,
    user,
} from './game';
import gameReducer from './game';
import { getInverted } from './playFieldUtils';
import { StorageService } from '@src/StorageService';

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

        test.each`
            actions                                 | testName                                        | event                      | stateSelector    | value
            ${[fieldSize(Size.MIDDLE)]}             | ${'sets .fieldWidth from FIELD_SIZE action'}    | ${AppActions.FIELD_SIZE}   | ${'fieldWidth'}  | ${sizeToWH[Size.MIDDLE].w}
            ${[fieldSize(Size.LARGE)]}              | ${'sets .fieldHeight from FIELD_SIZE action'}   | ${AppActions.FIELD_SIZE}   | ${'fieldHeight'} | ${sizeToWH[Size.LARGE].h}
            ${[fieldSize(Size.MIDDLE)]}             | ${'sets .data from FIELD_SIZE action'}          | ${AppActions.FIELD_SIZE}   | ${'data.length'} | ${len}
            ${[fieldSize(rndS)]}                    | ${'sets .size from FIELD_SIZE action'}          | ${AppActions.FIELD_SIZE}   | ${'size'}        | ${rndS}
            ${[fieldSize(Size.MIDDLE), invert(id)]} | ${'sets .event from INVERT action'}             | ${AppActions.INVERT}       | ${null}          | ${null}
            ${[fieldSize(badFieldSize)]}            | ${'sets .size=SMALL from badFieldSize'}         | ${AppActions.FIELD_SIZE}   | ${'size'}        | ${Size.SMALL}
            ${[fillPercent(rndP)]}                  | ${'sets .fillPercent from FILL_PERCENT action'} | ${AppActions.FILL_PERCENT} | ${'fillPercent'} | ${rndP}
            ${[clear()]}                            | ${'sets .event from CLEAR action'}              | ${AppActions.CLEAR}        | ${'fillPercent'} | ${FillPercent.P0}
            ${[user(rndName)]}                      | ${'sets .userName from USER action'}            | ${AppActions.USER}         | ${'userName'}    | ${rndName}
        `(
            '$testName',
            async ({
                // eslint-disable-next-line no-unused-vars
                actions,
                testName,
                event,
                stateSelector,
                value,
            }) => {
                let state: AppState = defaultAppState;
                actions.forEach((action: AppAction) => {
                    state = gameReducer(state, action);
                });
                expect(state.event).toEqual(event);
                if (stateSelector !== null) {
                    expect(getFromState(state, stateSelector)).toEqual(getVal(actions, value));
                }
            }
        );
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

    it('sets all .data into .visible=false from CLEAR action', () => {
        const srcState = defaultAppState;
        expect(
            gameReducer(srcState, clear()).data.filter((cell: CellInfo) => cell === CellInfo.alive)
        ).toHaveLength(0);
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

    test('loadState() calls dispatch() if storage.loadState resolves', (done) => {
        const storageMock = {
            state: defaultAppState,

            setState(state: AppState) {
                this.state = state;
            },

            getState(): AppState {
                if (this.state) {
                    return this.state;
                }
                return defaultAppState;
            },

            loadState: (): Promise<AppState> => {
                return new Promise((resolve, reject) => resolve(defaultAppState));
            },

            saveState: (): Promise<void> => Promise.resolve(),
        };
        const storage = storageMock as StorageService;

        const thunkAction = loadState(storage);
        const dispatch = jest.fn();
        thunkAction(dispatch).then(() => {
            expect(dispatch).toHaveBeenCalledTimes(1);
            done();
        });
    });
});
