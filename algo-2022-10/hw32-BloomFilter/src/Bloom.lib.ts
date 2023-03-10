import { Bloom, sha256 } from './Bloom';

export const wordsPresent = [
    'abound',
    'abounds',
    'abundance',
    'abundant',
    'accessable',
    'bloom',
    'blossom',
    'bolster',
    'bonny',
    'bonus',
    'bonuses',
    'coherent',
    'cohesive',
    'colorful',
    'comely',
    'comfort',
    'gems',
    'generosity',
    'generous',
    'generously',
    'genial'
];

export const wordsAbsent = [
    'bluff',
    'cheater',
    'hate',
    'war',
    'humanity',
    'racism',
    'hurt',
    'nuke',
    'gloomy',
    'facebook',
    'geekforgeeks',
    'twitter'
];

export enum CheckCode {
    FALSE_POSITIVE = 0,
    PRESENT = 1,
    NOT_PRESENT = 2
}
export interface BloomStats {
    totalPositives: number;
    falsePositives: number;
    wordsCheck: CheckCode[];
}
export const getBloomStats = (
    wordsPresent: string[],
    wordsAbsent: string[],
    testWords: string[]
): BloomStats => {
    const bloom = Bloom.create(100, 2, sha256);

    wordsPresent.forEach((word) => bloom.insert(word));

    const result: BloomStats = {
        totalPositives: 0,
        falsePositives: 0,
        wordsCheck: []
    };

    testWords.forEach((word) => {
        if (bloom.contains(word)) {
            result.totalPositives++;
            if (wordsAbsent.includes(word)) {
                result.falsePositives++;
                result.wordsCheck.push(CheckCode.FALSE_POSITIVE);
            } else {
                result.wordsCheck.push(CheckCode.PRESENT);
            }
        } else {
            result.wordsCheck.push(CheckCode.NOT_PRESENT);
        }
    });
    return result;
};
