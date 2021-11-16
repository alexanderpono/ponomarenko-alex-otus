import faker from 'faker';

export const getFromState = (state: Record<string, any>, selector: string): string => {
    if (selector.indexOf('.') === -1) {
        return state[selector] as string;
    }
    const selectorAr = selector.split('.');
    const lastSelectorItem = selectorAr.concat().pop() as string;
    if (selectorAr.length === 1) {
        return state[selector] as string;
    } else {
        const domainName = selectorAr[0];
        const stateDomain = state[domainName] as Record<string, string>;
        return stateDomain[lastSelectorItem];
    }
};

export const getVal = (
    actions: { payload: Record<string, string | Object> }[],
    value: number | string
) => {
    let val = value;
    if (typeof value === 'string' && value.indexOf('.') !== -1) {
        const selectorAr = value.split('.');
        const lastSelectorItem = selectorAr.concat().pop() as string;
        val = getFromState(actions[0].payload, lastSelectorItem);
    }
    return val;
};

export const num = () => faker.datatype.number();
export const str = () => faker.random.words();
