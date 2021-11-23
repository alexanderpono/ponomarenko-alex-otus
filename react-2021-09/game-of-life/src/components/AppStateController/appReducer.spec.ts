import { getFromState, getVal } from '../../testFramework/lib/reducer';
import {
    AppAction,
    AppActions,
    appReducer,
    AppState,
    defaultAppState,
    fieldSize,
    invert,
} from './appReducer';

describe('appReducer', () => {
    describe('appReducer-parameterized', () => {
        const w = Math.round(5 * Math.random());
        const h = Math.round(5 * Math.random());
        const len = w * h;
        const id = Math.round(len * Math.random());
        test.each`
            actions              | testName                                      | event                    | stateSelector    | value
            ${[fieldSize(w, h)]} | ${'sets .fieldWidth from FIELD_SIZE action'}  | ${AppActions.FIELD_SIZE} | ${'fieldWidth'}  | ${'payload.fieldWidth'}
            ${[fieldSize(w, h)]} | ${'sets .fieldHeight from FIELD_SIZE action'} | ${AppActions.FIELD_SIZE} | ${'fieldHeight'} | ${'payload.fieldHeight'}
            ${[fieldSize(w, h)]} | ${'sets .data from FIELD_SIZE action'}        | ${AppActions.FIELD_SIZE} | ${'data.length'} | ${len}
            ${[invert(id)]}      | ${'sets .event from INVERT action'}           | ${AppActions.INVERT}     | ${null}          | ${null}
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
