import faker from 'faker';

export const getFromState = (state, selector: string) => {
    if (selector.indexOf('.') === -1) {
        return state[selector];
    }
    const selectorAr = selector.split('.');
    const lastSelectorItem = selectorAr.concat().pop();
    if (selectorAr.length === 1) {
        return state[selector];
    } else {
        let domainName = selectorAr[0];
        return state[domainName][lastSelectorItem];
    }
};

export const getVal = (actions: { payload: Object }[], value: number | string) => {
    let val = value;
    if (typeof value === 'string' && value.indexOf('.') !== -1) {
        const selectorAr = value.split('.');
        const lastSelectorItem = selectorAr.concat().pop();
        val = getFromState(actions[0].payload, lastSelectorItem);
    }
    return val;
};

export const num = () => faker.datatype.number();
export const str = () => faker.random.words();
