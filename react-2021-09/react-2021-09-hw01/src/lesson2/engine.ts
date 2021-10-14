import { ParsedLineType } from "./parser";
import { isNumber, isUnaryOperator, isBinaryOperator } from "./helpers";
import { unaryMathOperators, binaryMathOperators } from "./mathOperators";

export const backPolishCalc = (backPolishLine: ParsedLineType): number => {
    const stack: number[] = [];
    backPolishLine.forEach((item) => {
        if (isNumber(String(item))) {
            stack.push(Number(item));
            return;
        }

        if (isBinaryOperator(String(item))) {
            if (stack.length < 2) {
                throw `no enough operands for operation ${item}`;
            }
            const second = Number(stack.pop());
            const first = Number(stack.pop());
            const result: number = binaryMathOperators[item](first, second);
            stack.push(result);
        }

        if (isUnaryOperator(String(item))) {
            if (stack.length < 1) {
                throw `no enough operands for operation ${item}`;
            }
            const first = Number(stack.pop());
            const result: number = unaryMathOperators[item](Number(first));
            stack.push(result);
        }
    });

    if (stack.length === 1) {
        return Number(stack.pop());
    }

    throw `backPolishCalc(): stack length=${stack.length}`;
};
