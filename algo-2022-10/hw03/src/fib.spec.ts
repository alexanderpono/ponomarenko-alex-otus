import {
    fibGoldenSection,
    fibIterative,
    fibMatrixBinaryDecompositionOfPower,
    fibMultMatrix,
    fibRecursive,
    Matrix2x2,
    mult2x2,
    powMatrix2x2
} from './fib';

//Fibonacci numbers 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, ...
describe('fibRecursive', () => {
    test.each`
        N     | expected
        ${0}  | ${0}
        ${1}  | ${1}
        ${2}  | ${1}
        ${3}  | ${2}
        ${14} | ${377}
    `('it returns $expected from (N=$N)', ({ N, expected }) => {
        expect(fibRecursive(N)).toEqual(expected);
    });
});

describe('fibIterative', () => {
    test.each`
        N     | expected
        ${0}  | ${0}
        ${1}  | ${1}
        ${2}  | ${1}
        ${3}  | ${2}
        ${7}  | ${13}
        ${14} | ${377}
    `('it returns $expected from (N=$N)', ({ N, expected }) => {
        expect(fibIterative(N)).toEqual(expected);
    });
});

describe('fibGoldenSection', () => {
    test.each`
        N     | expected
        ${0}  | ${0}
        ${1}  | ${1}
        ${2}  | ${1}
        ${3}  | ${2}
        ${7}  | ${13}
        ${14} | ${377}
    `('it returns $expected from (N=$N)', ({ N, expected }) => {
        expect(fibGoldenSection(N)).toEqual(expected);
    });
});

const toMatrix = (s: string): Matrix2x2 => ({
    a: parseInt(s[0]),
    b: parseInt(s[1]),
    c: parseInt(s[2]),
    d: parseInt(s[3])
});
describe('mult2x2', () => {
    test.each`
        m1                  | m2                  | expected
        ${toMatrix('1001')} | ${toMatrix('1001')} | ${toMatrix('1001')}
        ${toMatrix('1001')} | ${toMatrix('1234')} | ${toMatrix('1234')}
        ${toMatrix('1221')} | ${toMatrix('2345')} | ${{ a: 10, b: 13, c: 8, d: 11 }}
    `('it returns $expected from m1=($m1) and m2=($m2)', ({ m1, m2, expected }) => {
        expect(mult2x2(m1, m2)).toEqual(expected);
    });
});

describe('powMatrix2x2', () => {
    test.each`
        m                   | N    | expected
        ${toMatrix('1001')} | ${1} | ${toMatrix('1001')}
        ${toMatrix('1001')} | ${2} | ${toMatrix('1001')}
        ${toMatrix('2002')} | ${1} | ${toMatrix('2002')}
        ${toMatrix('2002')} | ${2} | ${toMatrix('4004')}
        ${toMatrix('2002')} | ${3} | ${toMatrix('8008')}
        ${toMatrix('2002')} | ${4} | ${{ a: 16, b: 0, c: 0, d: 16 }}
    `('it returns $expected from m=($m) and N=($N)', ({ m, N, expected }) => {
        expect(powMatrix2x2(m, N)).toEqual(expected);
    });
});

describe('fibMultMatrix', () => {
    test.each`
        N     | expected
        ${0}  | ${0}
        ${1}  | ${1}
        ${2}  | ${1}
        ${3}  | ${2}
        ${7}  | ${13}
        ${14} | ${377}
    `('it returns $expected from (N=$N)', ({ N, expected }) => {
        expect(fibMultMatrix(N)).toEqual(expected);
    });
});

describe('fibMatrixBinaryDecompositionOfPower', () => {
    test.each`
        N     | expected
        ${0}  | ${0}
        ${1}  | ${1}
        ${2}  | ${1}
        ${3}  | ${2}
        ${7}  | ${13}
        ${9}  | ${34}
        ${14} | ${377}
    `('it returns $expected from (N=$N)', ({ N, expected }) => {
        expect(fibMatrixBinaryDecompositionOfPower(N)).toEqual(expected);
    });
});
