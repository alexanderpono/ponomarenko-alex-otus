import { lineToReversePolish } from "./parser";

import { backPolishCalc } from "./engine";

export const runner = (line: string): number => {
    const parsedLine = lineToReversePolish(line);
    return backPolishCalc(parsedLine);
};
