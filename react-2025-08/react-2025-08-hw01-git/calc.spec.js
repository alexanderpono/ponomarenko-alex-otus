import { add } from './calc.js';


describe('add', () => {
    test.each`
        a     | b     | expected
        ${1}  | ${1}  | ${2}
        ${1}  | ${2}  | ${3}
        ${10} | ${-5} | ${5}
    `('it returns $expected from $a and $b', ({ a, b, expected }) => {
        expect(add(a, b)).toEqual(expected);
    });
});
