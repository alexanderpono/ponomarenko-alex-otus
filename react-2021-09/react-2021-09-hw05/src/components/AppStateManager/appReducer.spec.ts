import { Size, sizeToWH } from '@src/consts';
import { getFromState, getVal } from '@src/testFramework/lib/reducer';
import {
    AppAction,
    AppActions,
    appReducer,
    AppState,
    defaultAppState,
    fieldSize,
    invert,
} from './appReducer';

const num = (size: number) => Math.round(size * Math.random());

describe('appReducer', () => {
    describe('appReducer-parameterized', () => {
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

        const rndS = rndSize();

        test.each`
            actions                                 | testName                                      | event                    | stateSelector    | value
            ${[fieldSize(Size.MIDDLE)]}             | ${'sets .fieldWidth from FIELD_SIZE action'}  | ${AppActions.FIELD_SIZE} | ${'fieldWidth'}  | ${sizeToWH[Size.MIDDLE].w}
            ${[fieldSize(Size.LARGE)]}              | ${'sets .fieldHeight from FIELD_SIZE action'} | ${AppActions.FIELD_SIZE} | ${'fieldHeight'} | ${sizeToWH[Size.LARGE].h}
            ${[fieldSize(Size.MIDDLE)]}             | ${'sets .data from FIELD_SIZE action'}        | ${AppActions.FIELD_SIZE} | ${'data.length'} | ${len}
            ${[fieldSize(rndS)]}                    | ${'sets .size from FIELD_SIZE action'}        | ${AppActions.FIELD_SIZE} | ${'size'}        | ${rndS}
            ${[fieldSize(Size.MIDDLE), invert(id)]} | ${'sets .event from INVERT action'}           | ${AppActions.INVERT}     | ${null}          | ${null}
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
