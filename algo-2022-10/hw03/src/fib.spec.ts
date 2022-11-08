import { fibIterative, fibRecursive } from './fib';

//Fibonacci numbers 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, ...
describe('fibRecursive', () => {
    test.each`
        N    | expected
        ${0} | ${0}
        ${1} | ${1}
        ${2} | ${1}
        ${3} | ${2}
        ${7} | ${13}
    `('it returns $expected from (N=$N)', ({ N, expected }) => {
        expect(fibRecursive(N)).toEqual(expected);
    });
});

describe('fibIterative', () => {
    test.each`
        N    | expected
        ${0} | ${0}
        ${1} | ${1}
        ${2} | ${1}
        ${3} | ${2}
        ${7} | ${13}
    `('it returns $expected from (N=$N)', ({ N, expected }) => {
        expect(fibIterative(N)).toEqual(expected);
    });
});
