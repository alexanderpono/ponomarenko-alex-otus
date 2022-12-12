import { SortResult } from './types';

export class Sort {
    N: number = 0;
    cmp: number = 0;
    asg: number = 0;
    A: number[] = [];

    constructor() {}

    setA(A: number[]) {
        this.A = A;
        this.N = A.length;
        return this;
    }

    bubble = (): SortResult => {
        for (let j = this.N - 1; j >= 0; j--) {
            for (let i = 0; i < j; i++) {
                this.cmp++;
                if (this.A[i] > this.A[i + 1]) {
                    this.swap(i, i + 1);
                }
            }
        }
        return {
            method: 'bubble',
            array: this.A,
            compares: this.cmp,
            assignments: this.asg
        };
    };

    swap = (indexA: number, indexB: number) => {
        this.asg += 3;
        const tmp = this.A[indexA];
        this.A[indexA] = this.A[indexB];
        this.A[indexB] = tmp;
    };

    setSorted = (N: number) => {
        this.N = N;
        this.A = [];
        for (let j = 0; j < N; j++) {
            this.A[j] = j;
        }
    };

    setReversed = (N: number) => {
        this.N = N;
        this.A = [];
        for (let j = 0; j < N; j++) {
            this.A[j] = N - j;
        }
    };

    setRandom = (N: number) => {
        this.N = N;
        this.A = [];
        for (let j = 0; j < N; j++) {
            this.A[j] = Math.round(12345 * Math.random());
        }
    };
}
