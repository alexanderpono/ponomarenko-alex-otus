import { getFromState, getVal, num, str } from './reducer';

test('getFromState', () => {
    const state = {
        a: str(),
        b: num(),
        group1: {
            c: str()
        }
    };
    expect(getFromState(state, 'a')).toEqual(state.a);
    expect(getFromState(state, 'b')).toEqual(state.b);
    expect(getFromState(state, 'group1.c')).toEqual(state.group1.c);
});

test('getVal', () => {
    expect(getVal([], 1)).toEqual(1);
    expect(getVal([{ payload: { fieldName: 'ssssc' } }], 'payload.fieldName')).toEqual('ssssc');
});
