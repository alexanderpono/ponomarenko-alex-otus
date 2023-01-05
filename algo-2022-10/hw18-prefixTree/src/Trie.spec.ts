import { TreeNode } from './TreeNode';
import { Trie } from './Trie';

describe('Trie', () => {
    describe('insert()-go()', () => {
        test.each`
            word       | goParam    | expected
            ${'apple'} | ${'apple'} | ${'TreeNode'}
            ${'apple'} | ${'bread'} | ${null}
        `(
            'it returns $expected from .insert("$word") & .go("$goParam")',
            ({ word, goParam, expected }) => {
                const result = Trie.create().insert(word).go(goParam);
                if (expected === 'TreeNode') {
                    expect(result).not.toEqual(undefined);
                    expect(result).not.toEqual(null);
                    expect(result).toBeInstanceOf(TreeNode);
                } else {
                    expect(result).toEqual(expected);
                }
            }
        );
    });

    describe('insert()-search()', () => {
        test.each`
            word       | searchParam | expected
            ${'apple'} | ${'apple'}  | ${true}
            ${'apple'} | ${'bread'}  | ${false}
        `(
            'it returns $expected from .insert("$word") & .search("$searchParam")',
            ({ word, searchParam, expected }) => {
                expect(Trie.create().insert(word).search(searchParam)).toEqual(expected);
            }
        );
    });

    describe('insert()-startsWith()', () => {
        test.each`
            word       | startsParam | expected
            ${'apple'} | ${'apple'}  | ${true}
            ${'apple'} | ${'app'}    | ${true}
            ${'apple'} | ${'bread'}  | ${false}
        `(
            'it returns $expected from .insert("$word") & .startsWith("$startsParam")',
            ({ word, startsParam, expected }) => {
                expect(Trie.create().insert(word).startsWith(startsParam)).toEqual(expected);
            }
        );
    });
});
