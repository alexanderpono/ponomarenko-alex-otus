import { ParsedLineType } from "./parser";
import { isNumber, isUnaryOperator, isBinaryOperator } from "./helpers";
import {
    mathPriorities,
    mathOperatorsPriorities,
    unaryMathOperators,
    binaryMathOperators,
} from "./mathOperators";

const [FIRST, SECOND] = mathPriorities;

export const firstPrioritiesCalc = (stack: ParsedLineType): ParsedLineType => {
    const res = stack.reduce<ParsedLineType>((result, nextItem) => {
        const prevItem = result[result.length - 2];
        const item = result[result.length - 1];

        if (
            isUnaryOperator(String(nextItem)) &&
            mathOperatorsPriorities[nextItem] === FIRST
        ) {
            result = [
                ...result.slice(0, -1),
                unaryMathOperators[nextItem](Number(item)),
            ];
        } else if (
            isBinaryOperator(String(item)) &&
            mathOperatorsPriorities[item] === FIRST
        ) {
            result = [
                ...result.slice(0, -2),
                binaryMathOperators[item](Number(prevItem), Number(nextItem)),
            ];
        } else {
            result.push(nextItem);
        }
        return result;
    }, []);

    return res;
};

export const secondPrioritiesCalc = (stack: ParsedLineType): number =>
    stack.reduce<number>((result, nextItem, key) => {
        const item = stack[key - 1];

        if (mathOperatorsPriorities[item] === FIRST) {
            throw new TypeError("Unexpected stack!");
        }

        if (
            !isNumber(String(item)) &&
            mathOperatorsPriorities[item] === SECOND
        ) {
            result = binaryMathOperators[item](
                Number(result),
                Number(nextItem)
            );
        }
        return result;
    }, Number(stack[0]));

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
