import { A, MIN_CODE } from './TreeNode';
import { TrieMap } from './TrieMap';

export class Program {
    main = () => {
        console.log('\n===== word length = 4 =====');
        this.testRandmom(4);

        console.log('\n===== word length = 10 =====');
        this.testRandmom(10);
    };

    testRandmom = (len: number) => {
        const trieMap = new TrieMap();

        const time00 = Date.now();
        const N = 10000;
        for (let i = 0; i < N; i++) {
            const word = this.getRandomWord(len);
            trieMap.set(word, word);
        }
        const time01 = Date.now();
        console.log(`TrieMap: set ${N} pairs elapsed ms=`, time01 - time00);

        let hitCount = 0;
        for (let i = 0; i < 2 * N; i++) {
            const word = this.getRandomWord(len);
            if (trieMap.get(word)) {
                console.log('hit=', `"${word}"`);
                hitCount++;
            }
        }
        console.log('hitCount=', hitCount);
        const time02 = Date.now();
        console.log(`TrieMap: get ${2 * N} pairs elapsed ms=`, time02 - time01);

        for (let i = 0; i < 2 * N; i++) {
            const word = this.getRandomWord(len);
            trieMap.delete(word);
        }
        const time03 = Date.now();
        console.log(`TrieMap: delete ${2 * N} pairs elapsed ms=`, time03 - time02);

        const map = new Map();
        const time10 = Date.now();
        for (let i = 0; i < N; i++) {
            const word = this.getRandomWord(len);
            map.set(word, word);
        }
        const time11 = Date.now();
        console.log(`JS.Map: insert ${N} pairs elapsed ms=`, time11 - time10);

        hitCount = 0;
        for (let i = 0; i < 2 * N; i++) {
            const word = this.getRandomWord(len);
            if (map.get(word)) {
                console.log('hit=', `"${word}"`);
                hitCount++;
            }
        }
        console.log('hitCount=', hitCount);
        const time12 = Date.now();
        console.log(`JS.Map: search ${N} pairs elapsed ms=`, time12 - time11);

        for (let i = 0; i < 2 * N; i++) {
            const word = this.getRandomWord(len);
            map.delete(word);
        }
        const time13 = Date.now();
        console.log(`JS.Map: delete ${N} pairs elapsed ms=`, time13 - time12);
    };

    getRandomWord(len: number): string {
        let s = '';
        for (let j = 0; j < len; j++) {
            s += String.fromCharCode(Math.floor(A * Math.random() + MIN_CODE));
        }
        return s;
    }

    static create = (): Program => {
        return new Program();
    };
}
