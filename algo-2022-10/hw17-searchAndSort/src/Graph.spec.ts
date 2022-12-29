import { Graph } from './Graph';

describe('Graph', () => {
    describe('initFromAdjacencyString', () => {
        const src1 = `.1.
111
..1`;

        const src2 = `.1
1.`;

        test.each`
            src     | expected
            ${src1} | ${[[0, 1, 0], [1, 1, 1], [0, 0, 1]]}
            ${src2} | ${[[0, 1], [1, 0]]}
        `('it returns $expected from "$src"', ({ src, expected }) => {
            expect(Graph.create().initFromAdjacencyString(src).getMatrix()).toEqual(expected);
        });
    });

    describe('getColumnsSumma', () => {
        const src1 = `.1.
111
..1`;

        const src2 = `.1
1.`;

        test.each`
            src     | expected
            ${src1} | ${[1, 2, 2]}
            ${src2} | ${[1, 1]}
        `('it returns $expected from "$src"', ({ src, expected }) => {
            expect(Graph.create().initFromAdjacencyString(src).getColumnsSumma()).toEqual(expected);
        });
    });

    describe('getZeroedVertices', () => {
        test.each`
            src             | expected
            ${[4, 0, 2]}    | ${[1]}
            ${[1, 5, 2, 0]} | ${[3]}
            ${[0, 5, 2, 0]} | ${[0, 3]}
            ${[1, 5, 2, 5]} | ${[]}
        `('it returns $expected from "$src"', ({ src, expected }) => {
            expect(Graph.create().getZeroedVertices(src)).toEqual(expected);
        });
    });
});
