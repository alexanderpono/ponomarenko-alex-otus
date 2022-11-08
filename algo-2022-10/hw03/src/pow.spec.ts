import { powIterative } from './pow';

describe('powIterative', () => {
    test.each`
        base | N    | expected
        ${1} | ${1} | ${1}
        ${2} | ${1} | ${2}
        ${2} | ${0} | ${1}
        ${2} | ${2} | ${4}
        ${2} | ${8} | ${256}
        ${3} | ${3} | ${27}
    `('it returns $expected from (base=$base, N=$N)', ({ base, N, expected }) => {
        expect(powIterative(base, N)).toEqual(expected);
    });
});
