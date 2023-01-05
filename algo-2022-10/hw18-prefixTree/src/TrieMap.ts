import { TreeNode } from './TreeNode';
import { Trie } from './Trie';

export class TrieMap extends Trie {
    set(key: string, value: unknown): void {
        const node = this.insert_(key);
        node.value = value;
    }

    get(key: string): unknown {
        const node: TreeNode | null = this.go(key);
        if (node === null) {
            return undefined;
        }
        return node.value;
    }

    delete(word: string): void {
        const node = this.go(word);
        if (node === null) {
            return;
        }
        node.value = undefined;
    }

    static create = (): TrieMap => {
        return new TrieMap();
    };
}
