import { A, MIN_CODE } from './TreeNode';
import { Trie } from './Trie';

export class Program {
    main = () => {
        console.log('\n===== word length = 4 =====');
        this.testRandmom(4);

        console.log('\n===== word length = 10 =====');
        this.testRandmom(10);
    };

    testRandmom = (len: number) => {
        const trie = new Trie();

        const time00 = Date.now();
        const N = 10000;
        for (let i = 0; i < N; i++) {
            const word = this.getRandomWord(len);
            trie.insert(word);
        }
        const time01 = Date.now();
        console.log(`Trie: insert ${N} words elapsed ms=`, time01 - time00);

        let hitCount = 0;
        for (let i = 0; i < 2 * N; i++) {
            const word = this.getRandomWord(len);
            if (trie.search(word)) {
                console.log('hit=', `"${word}"`);
                hitCount++;
            }
        }
        console.log('hitCount=', hitCount);
        const time02 = Date.now();
        console.log(`Trie: search ${2 * N} words elapsed ms=`, time02 - time01);

        const set = new Set();
        const time10 = Date.now();
        for (let i = 0; i < N; i++) {
            const word = this.getRandomWord(len);
            set.add(word);
        }
        const time11 = Date.now();
        console.log(`JS.Set: insert ${N} words elapsed ms=`, time11 - time10);

        hitCount = 0;
        for (let i = 0; i < 2 * N; i++) {
            const word = this.getRandomWord(len);
            if (set.has(word)) {
                console.log('hit=', `"${word}"`);
                hitCount++;
            }
        }
        console.log('hitCount=', hitCount);
        const time12 = Date.now();
        console.log(`JS.Set: search ${N} words elapsed ms=`, time12 - time11);
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
