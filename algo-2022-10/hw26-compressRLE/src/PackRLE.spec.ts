import { PackRLE } from './PackRLE';

describe('PackRLE', () => {
    describe('packRLE()', () => {
        test.each`
            text             | expected
            ${'AAAABBCDDDD'} | ${'4-A,2-B,1-C,4-D'}
            ${'ABCDEFGHIJK'} | ${'1-A,1-B,1-C,1-D,1-E,1-F,1-G,1-H,1-I,1-J,1-K'}
        `('it returns $expected from text="$text"', ({ text, expected }) => {
            expect(
                PackRLE.archiveDataToString(
                    PackRLE.create().packRLE(PackRLE.stringToCodesArray(text))
                )
            ).toEqual(expected);
        });
    });

    describe('unpackRLE()', () => {
        test.each`
            archiveData                                      | expected
            ${'4-A,2-B,1-C,4-D'}                             | ${'AAAABBCDDDD'}
            ${'1-A,1-B,1-C,1-D,1-E,1-F,1-G,1-H,1-I,1-J,1-K'} | ${'ABCDEFGHIJK'}
        `('it returns $expected from archiveData="$archiveData"', ({ archiveData, expected }) => {
            expect(
                PackRLE.codesArrayToString(
                    PackRLE.create().unpackRLE(PackRLE.stringToArchiveData(archiveData))
                )
            ).toEqual(expected);
        });
    });
});
