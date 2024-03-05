import faker from 'faker';

export const getFromState = (state: Record<string, any>, selector: string): string => {
    if (selector.indexOf('.') === -1) {
        return state[selector] as string;
    }
    const selectorAr = selector.split('.');
    const lastSelectorItem = selectorAr.concat().pop() as string;
    const domainName = selectorAr[0];
    const stateDomain = state[domainName] as Record<string, string>;
    return stateDomain[lastSelectorItem];
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
export const bool = () => faker.datatype.boolean();
export const size = (maxSize: number) => Math.floor(maxSize * Math.random());
export const rndSize = (min: number, max: number): number => min + Math.round(max * Math.random());
export const rndAr = (size: number, itemCallback: (p: number) => unknown) => {
    const result: unknown[] = [];
    for (let i = 0; i < size; i++) {
        result.push(itemCallback(i));
    }
    return result;
};
