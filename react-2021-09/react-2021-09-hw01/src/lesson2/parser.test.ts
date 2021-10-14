import { lineToReversePolish } from "./parser";

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
