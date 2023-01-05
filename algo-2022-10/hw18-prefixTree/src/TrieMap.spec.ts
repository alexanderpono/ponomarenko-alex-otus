import { TrieMap } from './TrieMap';

describe('TrieMap', () => {
    describe('set()-get()', () => {
        test.each`
            setKey     | setValue | getKey         | expectedValue
            ${'apple'} | ${'red'} | ${'apple'}     | ${'red'}
            ${'apple'} | ${'red'} | ${'pineapple'} | ${undefined}
        `(
            'it returns $expectedValue from .set("$setKey", "$setValue") & .get("$getKey")',
            ({ setKey, setValue, getKey, expectedValue }) => {
                const map = TrieMap.create();
                map.set(setKey, setValue);
                expect(map.get(getKey)).toEqual(expectedValue);
            }
        );
    });
});
