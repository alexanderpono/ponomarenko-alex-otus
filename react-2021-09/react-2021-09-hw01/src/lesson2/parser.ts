import { isNumber, isUnaryOperator, isBinaryOperator } from "./helpers";

export type ParsedLineType = (number | string)[];

const weights: { [key: string]: number } = {
    "**": 3,
    "!": 3,
    "*": 2,
    "/": 2,
    "^": 2,
    "+": 1,
    "-": 1,
};

const getWeight = function (operator: string): number | null {
    if (typeof weights[operator] !== "undefined") {
        return weights[operator];
    } else {
        return null;
    }
};

const operatorWeightIsMoreOrEqual = function (
    op1: string,
    op2: string
): boolean {
    const w1: number | null = getWeight(op1);
    const w2: number | null = getWeight(op2);
    if (w1 === null || w2 === null) {
        return false;
    }

    return w1 >= w2;
};

export const lineToReversePolish = (line: string): ParsedLineType => {
    const inputLine = line.split(" ");

    const stack: string[] = [];

    const resultLine = inputLine.reduce<ParsedLineType>((result, item, key) => {
        if (isNumber(item)) {
            result.push(Number(item));
        }

        if (isUnaryOperator(item) || isBinaryOperator(item)) {
            while (stack.length > 0) {
                const stackTop: string = stack[stack.length - 1];
                if (operatorWeightIsMoreOrEqual(stackTop, item)) {
                    result.push(String(stack.pop()));
                } else {
                    break;
                }
            }

            stack.push(item);
        }

        if (item === "(") {
            stack.push(item);
        }

        if (item === ")") {
            while (stack.length > 0) {
                const stackTop: string = stack[stack.length - 1];
                if (stackTop === "(") {
                    stack.pop();
                    break;
                } else {
                    result.push(String(stack.pop()));
                }
            }
        }

        if (key === inputLine.length - 1) {
            stack.reverse().forEach((item2) => {
                result.push(String(item2));
            });
        }
        return result;
    }, []);

    return resultLine;
};
