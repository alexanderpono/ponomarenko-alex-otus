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
