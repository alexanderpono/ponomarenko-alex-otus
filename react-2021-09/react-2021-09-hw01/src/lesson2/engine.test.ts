import { backPolishCalc } from "./engine";

describe("backPolishCalc", () => {
    it("[2]", () => {
        expect(backPolishCalc([2])).toEqual(2);
    });

    it("[2, 3, +]", () => {
        expect(backPolishCalc([2, 3, "+"])).toEqual(5);
    });

    // 1 + 2 * 3 -> 1 2 3 * + = 7
    it("[1, 2, 3, *, +]", () => {
        expect(backPolishCalc([1, 2, 3, "*", "+"])).toEqual(7);
    });
});
