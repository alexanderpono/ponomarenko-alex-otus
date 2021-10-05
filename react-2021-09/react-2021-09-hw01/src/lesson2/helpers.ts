import { unaryMathOperators, binaryMathOperators } from "./mathOperators";

export const isNumber = (item: string): boolean => !isNaN(Number(item));

export const isUnaryOperator = (op: string): boolean =>
    unaryMathOperators.hasOwnProperty(op);

export const isBinaryOperator = (op: string): boolean =>
    binaryMathOperators.hasOwnProperty(op);
