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

    describe('searchReverseScan()', () => {
        test.each`
            text                   | mask        | expected
            ${'ABCD.CDBCDEABCDEF'} | ${'ABCDEF'} | ${11}
            ${'ABCD.CDBCDEABCDEF'} | ${'ABCD'}   | ${0}
            ${'ABCD.CDBCDEABCDEF'} | ${'CD'}     | ${2}
            ${'ABCD.CDBCDEABCDEF'} | ${'.CD'}    | ${4}
            ${'ABCD.CDBCDEABCDEF'} | ${'DEF'}    | ${14}
            ${'ABCD.CDBCDEABCDEF'} | ${'F'}      | ${16}
        `('it returns $expected from text="$text" and mask="$mask"', ({ text, mask, expected }) => {
            expect(Search.create().searchReverseScan(text, mask)).toEqual(expected);
        });
    });

    describe('searchBMH()', () => {
        test.each`
            text                   | mask        | expected
            ${'DEF'} | ${'EF'}    | ${15}
        `('it returns $expected from text="$text" and mask="$mask"', ({ text, mask, expected }) => {
            expect(Search.create().searchBMH(text, mask)).toEqual(expected);
        });
    });
});
// ${'ABCD.CDBCDEABCDEF'} | ${'F'}      | ${16}

// ${'ABCD.CDBCDEABCDEF'} | ${'ABCDEF'} | ${11}
// ${'ABCD.CDBCDEABCDEF'} | ${'ABCD'}   | ${0}
// ${'ABCD.CDBCDEABCDEF'} | ${'CD'}     | ${2}
// ${'ABCD.CDBCDEABCDEF'} | ${'.CD'}    | ${4}
