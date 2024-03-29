export type ScalarOperationType = (first: number, second: number) => number;
export type UnaryScalarOperationType = (first: number) => number;

export const mul: ScalarOperationType = (
    first: number,
    second: number
): number => first * second;

export const div: ScalarOperationType = (
    first: number,
    second: number
): number => first / second;

export const add: ScalarOperationType = (
    first: number,
    second: number
): number => first + second;

export const minus: ScalarOperationType = (
    first: number,
    second: number
): number => first - second;

export const sqr: UnaryScalarOperationType = (first) => first * first;

export const pwr: ScalarOperationType = (first, p) => first ** p;

export const fact: UnaryScalarOperationType = (first) => {
    let result = 1;
    for (let i = 1; i <= first; i++) {
        result *= i;
    }
    return result;
};

export const binaryMathOperators: { [key: string]: ScalarOperationType } = {
    "*": mul,
    "/": div,
    "+": add,
    "-": minus,
    "^": pwr,
};

export const unaryMathOperators: { [key: string]: UnaryScalarOperationType } = {
    "**": sqr,
    "!": fact,
};
