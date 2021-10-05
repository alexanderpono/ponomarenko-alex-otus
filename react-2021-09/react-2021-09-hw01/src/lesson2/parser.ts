import { isNumber, isUnaryOperator, isBinaryOperator } from "./helpers";

export type ParsedLineType = (number | string)[];

export const parser = (line: string): ParsedLineType | null => {
    const stack = line.split(" ");

    return stack.reduce<ParsedLineType>((result, item, key) => {
        const prevItem = stack[key - 1];

        const isValidNumberPush = !isNumber(prevItem) && isNumber(item);
        const operatorAfterNumber =
            isNumber(prevItem) &&
            (isBinaryOperator(item) || isUnaryOperator(item));

        const binaryOperatorAfterUnary =
            isUnaryOperator(prevItem) && isBinaryOperator(item);

        const isValidOperatorPush =
            operatorAfterNumber || binaryOperatorAfterUnary;

        if (isValidNumberPush) {
            result.push(Number(item));
        } else if (isValidOperatorPush) {
            result.push(item);
        } else {
            throw new TypeError("Unexpected string");
        }
        return result;
    }, []);
};
