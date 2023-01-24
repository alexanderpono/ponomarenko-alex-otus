import { Search } from './Search';

describe('Search', () => {
    describe('searchFullScan()', () => {
        test.each`
            text                   | mask        | expected
            ${'ABCD.CDBCDEABCDEF'} | ${'ABCDEF'} | ${11}
            ${'ABCD.CDBCDEABCDEF'} | ${'ABCD'}   | ${0}
            ${'ABCD.CDBCDEABCDEF'} | ${'CD'}     | ${2}
            ${'ABCD.CDBCDEABCDEF'} | ${'.CD'}    | ${4}
            ${'ABCD.CDBCDEABCDEF'} | ${'DEF'}    | ${14}
        `('it returns $expected from text="$text" and mask="$mask"', ({ text, mask, expected }) => {
            expect(Search.create().searchFullScan(text, mask)).toEqual(expected);
        });
    });
});
