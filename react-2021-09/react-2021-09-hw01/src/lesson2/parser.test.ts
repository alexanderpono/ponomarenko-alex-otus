import { parser, lineToReversePolish } from "./parser";

describe("Parser correct cases", () => {
    it("1 + 32", () => {
        expect(parser("1 + 32")).toEqual([1, "+", 32]);
    });

    it("11 + 3 * 22", () => {
        expect(parser("11 + 3 * 22")).toEqual([11, "+", 3, "*", 22]);
    });

    it("1 + 32 - 2 + 2", () => {
        expect(parser("1 + 32 - 2 + 2")).toEqual([1, "+", 32, "-", 2, "+", 2]);
    });

    it("2 **", () => {
        expect(parser("2 **")).toEqual([2, "**"]);
    });

    it("2 ^ 4", () => {
        expect(parser("2 ^ 4")).toEqual([2, "^", 4]);
    });

    it("1 + 2 ^ 4", () => {
        expect(parser("1 + 2 ^ 4")).toEqual([1, "+", 2, "^", 4]);
    });

    it("2 ** + 1", () => {
        expect(parser("2 ** + 1")).toEqual([2, "**", "+", 1]);
    });

    it("2 !", () => {
        expect(parser("2 !")).toEqual([2, "!"]);
    });

    it("2 ** + 1 + 2 ^ 4 + 2 !", () => {
        expect(parser("2 ** + 1 + 2 ^ 4 + 2 !")).toEqual([
            2,
            "**",
            "+",
            1,
            "+",
            2,
            "^",
            4,

            "+",
            2,

            "!",
        ]);
    });
});

describe("Parser invalid cases", () => {
    it("1 + + 33 - 2", () => {
        expect(() => parser("1 + + 33 - 2")).toThrow(
            TypeError("Unexpected string")
        );
    });

    it("1 q 33 - 2", () => {
        expect(() => parser("1 q 33 - 2")).toThrow(
            TypeError("Unexpected string")
        );
    });
});

describe("Reverse polish correct cases", () => {
    it("should convert 2 into 2", () => {
        expect(lineToReversePolish("2")).toEqual([2]);
    });

    it("should convert 2 + 3 into 2 3 +", () => {
        expect(lineToReversePolish("2 + 3")).toEqual([2, 3, "+"]);
    });

    it("should convert 2 + 3 * 4 into 2 3 4 * +", () => {
        expect(lineToReversePolish("2 + 3 * 4")).toEqual([2, 3, 4, "*", "+"]);
    });

    it("should convert 2 + 3 * 4 - 5 into 2 3 4 * + 5 -", () => {
        expect(lineToReversePolish("2 + 3 * 4 - 5")).toEqual([
            2,
            3,
            4,
            "*",
            "+",
            5,
            "-",
        ]);
    });

    it("should convert 2 ** into 2 **", () => {
        expect(lineToReversePolish("2 **")).toEqual([2, "**"]);
    });

    it("should convert ( 3 ) into 3", () => {
        expect(lineToReversePolish("( 3 )")).toEqual([3]);
    });

    it("should convert ( 2 + 3 ) into 2 3 +", () => {
        expect(lineToReversePolish("( 2 + 3 )")).toEqual([2, 3, "+"]);
    });

    it("should convert ( 2 + 3 ) * 5 into 2 3 + 5 *", () => {
        expect(lineToReversePolish("( 2 + 3 ) * 5")).toEqual([
            2,
            3,
            "+",
            5,
            "*",
        ]);
    });
});

describe("Reverse polish wrong cases", () => {
    it("should convert 2 3 into 2 3", () => {
        expect(lineToReversePolish("2 3")).toEqual([2, 3]);
    });

    it("should convert 2 + 3 + into 2 3 + +", () => {
        expect(lineToReversePolish("2 + 3 +")).toEqual([2, 3, "+", "+"]);
    });
});
