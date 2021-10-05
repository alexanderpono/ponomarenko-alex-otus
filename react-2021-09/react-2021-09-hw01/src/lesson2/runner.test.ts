import { runner } from "./runner";

describe("Runner simple cases", () => {
    it("1 * 32", () => {
        expect(runner("1 * 32")).toEqual(32);
    });

    it("2 * 32", () => {
        expect(runner("2 * 32")).toEqual(64);
    });

    it("2 + 32", () => {
        expect(runner("2 + 32")).toEqual(34);
    });

    it("4 **", () => {
        expect(runner("4 **")).toEqual(16);
    });

    it("6 ^ 2", () => {
        expect(runner("6 ^ 2")).toEqual(36);
    });

    it("4 !", () => {
        expect(runner("4 !")).toEqual(24);
    });

    it("0 !", () => {
        expect(runner("0 !")).toEqual(1);
    });
});

describe("Runner tripled/mixed cases", () => {
    it("2 * 2 * 3", () => {
        expect(runner("2 * 2 * 3")).toEqual(12);
    });

    it("2 * 2 + 3", () => {
        expect(runner("2 * 2 + 3")).toEqual(7);
    });

    it("2 + 2 * 3", () => {
        expect(runner("2 + 2 * 3")).toEqual(8);
    });

    it("2 + 2 * 3 - 2 **", () => {
        expect(runner("2 + 2 * 3 - 2 **")).toEqual(4);
    });

    it("2 + 2 * 3 - 2 ^ 3", () => {
        expect(runner("2 + 2 * 3 - 2 ^ 3")).toEqual(0);
    });

    it("2 + 3 !", () => {
        expect(runner("2 + 3 !")).toEqual(8);
    });

    it("2 - 3 !", () => {
        expect(runner("2 - 3 !")).toEqual(-4);
    });

    it("2 - 3 ! + 1", () => {
        expect(runner("2 - 3 ! + 1")).toEqual(-3);
    });
});

describe("Runner long cases", () => {
    it("20 + 1 * 10 - 5 * 3", () => {
        expect(runner("20 + 1 * 10 - 5 * 3")).toEqual(15);
    });

    it("20 - 10 * 10 / 5 - 3", () => {
        expect(runner("20 - 10 * 10 / 5 - 3")).toEqual(-3);
    });

    it("20 - 10 * 10 / 5 - 3 + 2 ** + 4 ^ 1", () => {
        expect(runner("20 - 10 * 10 / 5 - 3 + 2 ** + 4 ^ 1")).toEqual(5);
    });

    it("20 - 10 * 10 / 5 - 3 ! + 2 ** + 4 ^ 1", () => {
        expect(runner("20 - 10 * 10 / 5 - 3 ! + 2 ** + 4 ^ 1")).toEqual(2);
    });

    it("( 2 + 3 ) * 5 + ( 7 ** + 9 ) ^ 2 + 4 !", () => {
        expect(runner("( 2 + 3 ) * 5 + ( 7 ** + 9 ) ^ 2 + 4 !")).toEqual(3413);
    });
});
