import { getFromState, getVal, num } from '../../testFramework/lib/reducer';
import { AppActions, appReducer, fieldSize } from './appReducer';

describe('appReducer', () => {
    describe('appReducer-parameterized', () => {
        test.each`
            actions                      | testName                                      | event                    | stateSelector    | value
            ${[fieldSize(num(), num())]} | ${'sets .fieldWidth from FIELD_SIZE action'}  | ${AppActions.FIELD_SIZE} | ${'fieldWidth'}  | ${'payload.fieldWidth'}
            ${[fieldSize(num(), num())]} | ${'sets .fieldHeight from FIELD_SIZE action'} | ${AppActions.FIELD_SIZE} | ${'fieldHeight'} | ${'payload.fieldHeight'}
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
                let state = undefined;
                actions.forEach((action) => {
                    state = appReducer(state, action);
                });
                expect(state.event).toEqual(event);
                if (stateSelector !== null) {
                    expect(getFromState(state, stateSelector)).toEqual(getVal(actions, value));
                }
            }
        );
    });
});
