export type HashNodePointer = HashNode | null;
export class HashNode {
    key: string = '';
    value: unknown = '';
    next: HashNodePointer = null;

    constructor(key: string, value: unknown) {
        this.key = key;
        this.value = value;
    }
}

const DEAD_LOOP_PROTECTION = 100;

export class HashTable {
    private mapSize: number = 0;
    private map: HashNodePointer[] = [];
    private useCount: number = 0;

    constructor() {
        this.resize(5);
    }

    public set(key: string, value: unknown) {
        const hashCode = this.getHashCode(key);
        const index = this.getHash(hashCode);
        const node = findNode(this.map[index], key);

        if (node !== null) {
            node.value = value;
        } else {
            const newNode = new HashNode(key, value);
            newNode.next = this.map[index];
            this.map[index] = newNode;
            this.useCount++;
        }

        if (this.useCount >= this.mapSize) {
            this.rehash();
        }
    }

    public get(key: string): unknown {
        const hashCode = this.getHashCode(key);
        const index = this.getHash(hashCode);
        const node = findNode(this.map[index], key);
        if (node !== null) {
            return node.value;
        }
        return undefined;
    }

    public unset(key: string) {
        const hashCode = this.getHashCode(key);
        const index = this.getHash(hashCode);
        let prevNode: HashNodePointer = null;
        let node = this.map[index];

        for (let i = 0; i < DEAD_LOOP_PROTECTION; i++) {
            if (node === null) {
                break;
            }
            if (node.key === key) {
                break;
            }
            prevNode = node;
            node = node.next;
        }

        if (node !== null) {
            if (prevNode === null) {
                this.map[index] = node.next;
            } else {
                prevNode.next = node.next;
            }
            node.next = null;
        }
    }

    public getHashCode(key: string): number {
        return key.split('').reduce((prev: number, cur: string) => prev + cur.charCodeAt(0), 0);
    }

    public getHash(hashCode: number): number {
        return this._getHash(hashCode, this.mapSize);
    }

    private _getHash(hashCode: number, base: number): number {
        return hashCode % base;
    }
    private rehash() {
        const oldMap = this.map;
        const oldSize = this.mapSize;
        this.mapSize = oldSize * 2;
        this.map = this.getNullArray(this.mapSize);
        for (let i = 0; i < oldSize; i++) {
            let existingNode = oldMap[i];
            for (let j = 0; j < DEAD_LOOP_PROTECTION; j++) {
                if (existingNode === null) {
                    break;
                }

                const hashCode = this.getHashCode(existingNode.key);
                const index = this.getHash(hashCode);

                const nextNode = existingNode.next;
                existingNode.next = null;
                this.putNodeToIndex(existingNode, index);
                existingNode = nextNode;
            }
            oldMap[i] = null;
        }
    }

    private putNodeToIndex(node: HashNode, index: number) {
        if (this.map[index] === null) {
            this.map[index] = node;
        } else {
            node.next = this.map[index];
            this.map[index] = node;
        }
    }

    private getNullArray(size: number): HashNodePointer[] {
        const map: HashNodePointer[] = [];
        for (let i = 0; i < size; i++) {
            map[i] = null;
        }
        return map;
    }

    private resize(newSize: number) {
        this.mapSize = newSize;
        this.map = this.getNullArray(newSize);
    }

    public print() {
        console.log(`useCount: ${this.useCount}`);
        for (let i = 0; i < this.mapSize; i++) {
            const line: HashNodePointer[] = [];
            let existingNode = this.map[i];
            for (let j = 0; j < DEAD_LOOP_PROTECTION; j++) {
                if (existingNode === null) {
                    break;
                }
                line.push(existingNode);
                existingNode = existingNode.next;
            }

            const lineText = line.map((node) => `${node?.key}=>${node?.value}`).join(', ');

            console.log(`hash: ${i}: ${lineText}`);
        }
    }
}

function findNode(node: HashNodePointer, key: string): HashNodePointer {
    for (let i = 0; i < DEAD_LOOP_PROTECTION; i++) {
        if (node === null) {
            break;
        }
        if (node.key === key) {
            break;
        }
        node = node.next;
    }
    return node;
}
