import {
    createMatrixFromLine,
    createTableLine,
    get10eN,
    getCountOfLuckyNumbers,
    getSummaOfEachColumn
} from './lib';

describe('createTableLine', () => {
    test.each`
        size | expected
        ${1} | ${[0]}
        ${2} | ${[0, 0]}
        ${5} | ${[0, 0, 0, 0, 0]}
    `('it returns $expected from $size', ({ size, expected }) => {
        expect(createTableLine(size)).toEqual(expected);
    });
});

describe('get10eN', () => {
    test.each`
        N    | expected
        ${0} | ${1}
        ${1} | ${10}
        ${2} | ${100}
        ${5} | ${100000}
    `('it returns $expected from $size', ({ N, expected }) => {
        expect(get10eN(N)).toEqual(expected);
    });
});

const MATRIX_N1 = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
];
const MATRIX_N2 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

describe('createMatrixFromLine', () => {
    const line0_N1 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const line0_N2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    test.each`
        line0       | expected     | tail
        ${line0_N1} | ${MATRIX_N1} | ${'MATRIX_N1 from line0_N1'}
        ${line0_N2} | ${MATRIX_N2} | ${'MATRIX_N2 from line0_N2'}
    `('it returns $tail', ({ line0, expected }) => {
        expect(createMatrixFromLine(line0)).toEqual(expected);
    });
});

describe('getSummaOfEachColumn', () => {
    const summColumns_N1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const summColumns_N2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    test.each`
        matrix       | expected          | tail
        ${MATRIX_N1} | ${summColumns_N1} | ${'summColumns_N1 from MATRIX_N1'}
        ${MATRIX_N2} | ${summColumns_N2} | ${'summColumns_N2 from MATRIX_N2'}
    `('it returns $tail', ({ matrix, expected }) => {
        expect(getSummaOfEachColumn(matrix)).toEqual(expected);
    });
});

describe('getCountOfLuckyNumbers', () => {
    test.each`
        N    | expected
        ${1} | ${10}
        ${2} | ${670}
        ${3} | ${55252}
    `('it returns $expected from $N', ({ N, expected }) => {
        expect(getCountOfLuckyNumbers(N)).toEqual(expected);
    });
});
