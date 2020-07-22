import { createNumbersString, getRandomInt } from './lib';

describe('getRandomInt()', () => {
    it(`returns value <=10 if max=10`, () => {
        const val = getRandomInt(10);
        expect(val).toBeLessThanOrEqual(10);
    });

    it(`returns value >=0 if max=10`, () => {
        const val = getRandomInt(10);
        expect(val).toBeGreaterThanOrEqual(0);
    });

    it(`returns integer value if max=10`, () => {
        const val = getRandomInt(10);
        expect(Math.floor(val)).toBe(val);
    });
});

describe('createNumbersString()', () => {
    it(`returns string of length>=100 from (5, 100)`, () => {
        const val = createNumbersString(5, 100);
        expect(val.length).toBeGreaterThanOrEqual(100);
    });

    it(`returns string of length>=1000 from (100, 1000)`, () => {
        const val = createNumbersString(100, 1000);
        expect(val.length).toBeGreaterThanOrEqual(1000);
    });
});
