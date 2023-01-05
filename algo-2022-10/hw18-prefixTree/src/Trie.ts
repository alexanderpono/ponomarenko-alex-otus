import { TreeNode } from './TreeNode';

export class Trie {
    root: TreeNode;

    constructor() {
        this.root = new TreeNode();
    }

    insert(word: string): Trie {
        let node = this.root;
        const chars = word.split('');
        chars.forEach((char: string) => {
            node = node.next(char);
        });
        node.isEnd = true;
        return this;
    }

    go(word: string): TreeNode | null {
        let node = this.root;
        const chars = word.split('');
        for (let i = 0; i < chars.length; i++) {
            const char = chars[i];
            if (node.exists(char)) {
                node = node.next(char);
            } else {
                return null;
            }
        }
        return node;
    }

    search = (word: string): boolean => {
        const node: TreeNode | null = this.go(word);
        if (node === null) {
            return false;
        }
        return node.isEnd;
    };

    startsWith(prefix: string): boolean {
        return this.go(prefix) != null;
    }

    static create = (): Trie => {
        return new Trie();
    };
}
