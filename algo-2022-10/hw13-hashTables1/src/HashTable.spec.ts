import { HashTable } from './HashTable';

describe('HashTable', () => {
    describe('getHashCode', () => {
        test.each`
            src      | expected
            ${'000'} | ${48 + 48 + 48}
            ${'abc'} | ${294}
        `('it returns $expected from "$src"', ({ src, expected }) => {
            const table = new HashTable();
            expect(table.getHashCode(src)).toEqual(expected);
        });
    });

    describe('getHash', () => {
        test.each`
            src   | expected
            ${12} | ${2}
            ${7}  | ${2}
            ${2}  | ${2}
            ${10} | ${0}
        `('it returns $expected from "$src"', ({ src, expected }) => {
            const table = new HashTable();
            expect(table.getHash(src)).toEqual(expected);
        });
    });

    describe('get & set', () => {
        test.each`
            initMap                 | key      | expected
            ${{ abc: 12, def: 15 }} | ${'abc'} | ${12}
            ${{ kit: 56, pig: 45 }} | ${'pig'} | ${45}
        `('get() returns $expected from key="$key" and $initMap', ({ initMap, key, expected }) => {
            const table = new HashTable();
            Object.entries(initMap).forEach(([key, value]) => table.set(key, value));
            expect(table.get(key)).toEqual(expected);
        });
    });

    describe('unset', () => {
        test.each`
            initMap                 | unsetkey
            ${{ abc: 12, def: 15 }} | ${'abc'}
        `('get($key) returns undefined after unset()', ({ initMap, unsetkey, expected }) => {
            const table = new HashTable();
            Object.entries(initMap).forEach(([key, value]) => table.set(key, value));
            expect(table.get(unsetkey)).not.toEqual(undefined);
            table.unset(unsetkey);
            expect(table.get(unsetkey)).toEqual(undefined);
        });
    });
});
