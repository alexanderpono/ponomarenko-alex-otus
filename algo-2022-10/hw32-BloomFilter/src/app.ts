import { CheckCode, getBloomStats, wordsAbsent, wordsPresent } from './Bloom.lib';

const testWords = [...wordsPresent, ...wordsAbsent];
const stats = getBloomStats(wordsPresent, wordsAbsent, testWords);
const maxWordLength = testWords.reduce(
    (result, word: string) => (word.length > result ? word.length : result),
    0
);
const addSpacesTo = (len: number, s: string): string =>
    `${s}${Array(len - s.length)
        .fill(' ')
        .join('')}`;

const formatWord = (word: string): string => addSpacesTo(maxWordLength + 2, `"${word}"`);

stats.wordsCheck.forEach((wordCode: CheckCode, index) => {
    switch (wordCode) {
        case CheckCode.FALSE_POSITIVE: {
            console.log(`${formatWord(testWords[index])} is a false positive!`);
            break;
        }
        case CheckCode.PRESENT: {
            console.log(`${formatWord(testWords[index])} is present (not a false positive)!`);
            break;
        }
        case CheckCode.NOT_PRESENT: {
            console.log(`${formatWord(testWords[index])} is definitely not present!`);
            break;
        }
    }
});
console.log(
    `\nRate of false positives: ${((stats.falsePositives / stats.totalPositives) * 100).toFixed(
        2
    )}%`
);
