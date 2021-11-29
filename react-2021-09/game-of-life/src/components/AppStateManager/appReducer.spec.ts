import { getFromState, getVal } from '../../testFramework/lib/reducer';
import {
    AppAction,
    AppActions,
    appReducer,
    AppState,
    dataFromBack,
    defaultAppState,
    fieldSize,
    invert,
    mouse,
} from './appReducer';

const num = (size: number) => Math.round(size * Math.random());

describe('appReducer', () => {
    describe('appReducer-parameterized', () => {
        const w = num(5);
        const h = num(5);
        const len = w * h;
        const id = num(len);
        const dataFB = {};
        const rndM = { x: num(5), y: num(5) };
        test.each`
            actions                   | testName                                           | event                        | stateSelector     | value
            ${[fieldSize(w, h)]}      | ${'sets .fieldWidth from FIELD_SIZE action'}       | ${AppActions.FIELD_SIZE}     | ${'fieldWidth'}   | ${'payload.fieldWidth'}
            ${[fieldSize(w, h)]}      | ${'sets .fieldHeight from FIELD_SIZE action'}      | ${AppActions.FIELD_SIZE}     | ${'fieldHeight'}  | ${'payload.fieldHeight'}
            ${[fieldSize(w, h)]}      | ${'sets .data from FIELD_SIZE action'}             | ${AppActions.FIELD_SIZE}     | ${'data.length'}  | ${len}
            ${[invert(id)]}           | ${'sets .event from INVERT action'}                | ${AppActions.INVERT}         | ${null}           | ${null}
            ${[dataFromBack(dataFB)]} | ${'sets .dataFromBack from DATA_FROM_BACK action'} | ${AppActions.DATA_FROM_BACK} | ${'dataFromBack'} | ${dataFB}
            ${[mouse(rndM)]}          | ${'sets .dataFromBack from MOUSE action'}          | ${AppActions.MOUSE}          | ${'mouse'}        | ${rndM}
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
                    state = appReducer(state, action);
                });
                expect(state.event).toEqual(event);
                if (stateSelector !== null) {
                    expect(getFromState(state, stateSelector)).toEqual(getVal(actions, value));
                }
            }
        );
    });

    it('inverts .visible of item(num) from from INVERT action', () => {
        const srcState = defaultAppState;
        const id = Math.round(srcState.fieldWidth * srcState.fieldHeight * Math.random());
        const oldVisible = srcState.data[id].visible;
        expect(appReducer(srcState, invert(id)).data[id].visible).toBe(!oldVisible);
    });
});
