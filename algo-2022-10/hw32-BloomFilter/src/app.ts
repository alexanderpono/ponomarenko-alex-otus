import { CheckCode, getBloomStats, wordsAbsent, wordsPresent } from './Bloom.lib';
import { Bloom } from './Bloom';
import { md5, sha1, sha256, sha3_512 } from './hashFuncs';

const testWords = [...wordsPresent, ...wordsAbsent];
const stats = getBloomStats(
    wordsPresent,
    wordsAbsent,
    testWords,
    Bloom.create(100, 2, [sha256, sha256])
);
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

const hashFuncs = {
    md5,
    sha1,
    sha256,
    sha3_512
};

const run = (n: number, k: number, funcNames: string[]) => {
    const stats = getBloomStats(
        wordsPresent,
        wordsAbsent,
        testWords,
        Bloom.create(
            n,
            k,
            funcNames.map((name) => hashFuncs[name])
        )
    );
    console.log(
        `\n(n=${n} k=${k} funcs=${funcNames}) FP Rate=${(
            (stats.falsePositives / stats.totalPositives) *
            100
        ).toFixed(2)}%`
    );
};

run(100, 2, ['sha256', 'sha256']);
run(100, 3, ['sha256', 'sha256', 'sha256']);
run(100, 4, ['sha256', 'sha256', 'sha256', 'sha256']);

run(150, 2, ['sha256', 'sha256']);
run(150, 3, ['sha256', 'sha256', 'sha256']);
run(150, 4, ['sha256', 'sha256', 'sha256', 'sha256']);

run(200, 2, ['sha256', 'sha256']);
run(200, 3, ['sha256', 'sha256', 'sha256']);
run(200, 4, ['sha256', 'sha256', 'sha256', 'sha256']);

run(100, 2, ['sha256', 'md5']);
run(100, 3, ['sha256', 'md5', 'sha1']);
run(100, 4, ['sha256', 'md5', 'sha1', 'sha3_512']);

run(150, 2, ['sha256', 'md5']);
run(150, 3, ['sha256', 'md5', 'sha1']);
run(150, 4, ['sha256', 'md5', 'sha1', 'sha3_512']);

run(200, 2, ['sha256', 'md5']);
run(200, 3, ['sha256', 'md5', 'sha1']);
run(200, 4, ['sha256', 'md5', 'sha1', 'sha3_512']);
