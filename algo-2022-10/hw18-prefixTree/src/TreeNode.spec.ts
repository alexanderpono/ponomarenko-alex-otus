import { TreeNode } from './TreeNode';

describe('TreeNode', () => {
    describe('getIndex()', () => {
        test.each`
            char   | expected
            ${' '} | ${0}
            ${'A'} | ${'A'.charCodeAt(0) - ' '.charCodeAt(0)}
            ${'a'} | ${'a'.charCodeAt(0) - ' '.charCodeAt(0)}
        `('it returns $expected from "$char"', ({ char, expected }) => {
            expect(TreeNode.create().getIndex(char)).toEqual(expected);
        });
    });

    describe('exists()', () => {
        test.each`
            char   | testExists | expected
            ${'a'} | ${'a'}     | ${true}
            ${'a'} | ${'b'}     | ${false}
        `('it returns $expected from "$char", "$testExists"', ({ char, testExists, expected }) => {
            const node = TreeNode.create();
            node.next(char);

            expect(node.exists(testExists)).toEqual(expected);
        });
    });

    describe('next()', () => {
        test.each`
            char
            ${'a'}
            ${'b'}
        `('it works with "$char"', ({ char }) => {
            const node = TreeNode.create();
            const result = node.next(char);

            expect(result).not.toEqual(undefined);
            expect(result).not.toEqual(null);
            expect(result).toBeInstanceOf(TreeNode);
        });
    });
});
