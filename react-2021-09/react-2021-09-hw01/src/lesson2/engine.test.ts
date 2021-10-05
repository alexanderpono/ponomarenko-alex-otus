import {
    firstPrioritiesCalc,
    secondPrioritiesCalc,
    backPolishCalc,
} from "./engine";

describe("firstPrioritiesCalc simple cases", () => {
    it("[1, * 32]", () => {
        expect(firstPrioritiesCalc([1, "*", 32])).toEqual([32]);
    });

    it("[32, /, 32]", () => {
        expect(firstPrioritiesCalc([32, "/", 32])).toEqual([1]);
    });

    it("[32, + 32]", () => {
        expect(firstPrioritiesCalc([32, "+", 32])).toEqual([32, "+", 32]);
    });

    it("[5, **]", () => {
        expect(firstPrioritiesCalc([5, "**"])).toEqual([25]);
    });

    it("[4, !]", () => {
        expect(firstPrioritiesCalc([4, "!"])).toEqual([24]);
    });
});

describe("firstPrioritiesCalc mixed with second priorities cases", () => {
    it("[32, /, 32, +, 10, *, 10]", () => {
        expect(firstPrioritiesCalc([32, "/", 32, "+", 10, "*", 10])).toEqual([
            1,
            "+",
            100,
        ]);
    });
});

describe("secondPrioritiesCalc invalid cases", () => {
    it("[32, / 32]", () => {
        expect(() => secondPrioritiesCalc([32, "/", 32])).toThrow(
            TypeError("Unexpected stack!")
        );
    });
});

describe("secondPrioritiesCalc simple cases", () => {
    it("[32, + 32]", () => {
        expect(secondPrioritiesCalc([32, "+", 32])).toEqual(64);
    });

    it("[32, - 32]", () => {
        expect(secondPrioritiesCalc([32, "-", 32])).toEqual(0);
    });

    it("[32, - 32, +, 10]", () => {
        expect(secondPrioritiesCalc([32, "-", 32, "+", 10])).toEqual(10);
    });
});

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
