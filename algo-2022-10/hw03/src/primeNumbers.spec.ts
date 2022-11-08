import { BruteForceMethod } from './primeNumbers';

// prime numbers: 2 3 5 7 11 13 17 19 23 ...
describe('BruteForceMethod', () => {
    test.each`
        N    | expected
        ${2} | ${1}
        ${3} | ${2}
        ${4} | ${2}
        ${5} | ${3}
        ${6} | ${3}
        ${7} | ${4}
    `('it returns $expected from (N=$N)', ({ N, expected }) => {
        const method = new BruteForceMethod();
        expect(method.getPrimeNumbersCount(N)).toEqual(expected);
    });
});
