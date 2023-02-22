import { GCD } from './GCD';

describe('GCD', () => {
    test.each`
        a     | b     | expected
        ${1}  | ${1}  | ${1}
        ${10} | ${10} | ${10}
        ${12} | ${6}  | ${6}
        ${36} | ${42} | ${6}
        ${75} | ${35} | ${5}
    `('it returns $expected from a=$a, b=$b', ({ a, b, expected }) => {
        expect(GCD(a, b)).toEqual(expected);
    });
});
