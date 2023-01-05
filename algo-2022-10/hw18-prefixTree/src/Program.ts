import { Trie } from './Trie';

export class Program {
    main = () => {
        const trie = new Trie();
        trie.insert('apple');
        console.log(`trie.search('apple')=`, trie.search('apple'));
        console.log(`trie.startsWith('apple')=`, trie.startsWith('apple'));
        console.log(`trie.startsWith('app')=`, trie.startsWith('app'));
        console.log(`trie.startsWith('bb')=`, trie.startsWith('bb'));
    };

    testRandom = () => {
        const trie = new Trie();
        const N = 100;
        for (let i = 0; i < N; i++) {
            const word = this.getRandomWord();
            trie.insert(word);
        }

        let hitCount = 0;
        for (let i = 0; i < 2 * N; i++) {
            const word = this.getRandomWord();
            if (trie.search(word)) {
                hitCount++;
            }
        }
    };

    getRandomWord(): string {
        let len = 10;
        let s = '';
        for (let j = 0; j < len; j++) {
            s += String.fromCharCode(Math.round(96 * Math.random())); // + ' '.charCodeAt(0)
        }
        return s;
    }

    static create = (): Program => {
        return new Program();
    };
}
