const HAS_KEY = 1;
const NO_KEY = 0;

export class Bloom {
    vector: number[];
    bigM: bigint;

    constructor(
        private m: number,
        private k: number,
        private hashFuncs: ((s: string) => bigint)[]
    ) {
        this.vector = Array(m).fill(NO_KEY);
        this.bigM = BigInt(this.m);
    }

    calcHash = (key: string, i: number): bigint => this.hashFuncs[i](`${key}${i}`);
    insert = (key: string) => {
        for (let i = 0; i < this.k; i++) {
            const index = Number(this.calcHash(key, i) % this.bigM);
            this.vector[index] = HAS_KEY;
        }
    };

    contains = (key: string): boolean => {
        for (let i = 0; i < this.k; i++) {
            const index = Number(this.calcHash(key, i) % this.bigM);
            if (this.vector[index] === NO_KEY) {
                return false;
            }
        }
        return true;
    };

    static create(m: number, k: number, hashFuncs: ((s: string) => bigint)[]): Bloom {
        return new Bloom(m, k, hashFuncs);
    }
}
