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

    swap = (indexA: number, indexB: number) => {
        this.asg += 3;
        const tmp = this.A[indexA];
        this.A[indexA] = this.A[indexB];
        this.A[indexB] = tmp;
    };

    insertion = () => {
        for (let j = 1; j < this.N; j++) {
            for (let i = j - 1; i >= 0 && ++this.cmp > 0 && this.A[i] > this.A[i + 1]; i--) {
                this.swap(i, i + 1);
            }
        }
        return {
            method: 'insertion',
            array: this.A,
            compares: this.cmp,
            assignments: this.asg
        };
    };

    insertionShift = () => {
        for (let j = 1; j < this.N; j++) {
            let K = this.A[j];
            this.asg++;
            let i = 0;
            for (i = j - 1; i >= 0 && ++this.cmp > 0 && this.A[i] > K; i--) {
                this.A[i + 1] = this.A[i];
            }
            this.A[i + 1] = K;
        }
        return {
            method: 'insertionShift',
            array: this.A,
            compares: this.cmp,
            assignments: this.asg
        };
    };

    insertionBinarySearch = () => {
        for (let j = 1; j < this.N; j++) {
            let K = this.A[j];
            this.asg++;
            const p = this.binarySearch(K, 0, j - 1);
            let i = 0;
            for (i = j - 1; i >= p; i--) {
                this.A[i + 1] = this.A[i];
                this.asg++;
            }
            this.A[i + 1] = K;
            this.asg++;
        }
        return {
            method: 'insertionBinarySearch',
            array: this.A,
            compares: this.cmp,
            assignments: this.asg
        };
    };

    binarySearch = (key: number, low: number, high: number) => {
        if (high <= low) {
            if (key > this.A[low]) {
                return low + 1;
            } else {
                return low;
            }
        }
        let mid = Math.floor((low + high) / 2);
        this.cmp++;
        if (key > this.A[mid]) {
            return this.binarySearch(key, mid + 1, high);
        } else {
            return this.binarySearch(key, low, mid - 1);
        }
    };

    shell = () => {
        for (let gap = this.N / 2; gap > 0; gap /= 2) {
            for (let i = gap; i < this.N; i++) {
                for (
                    let j = i;
                    j > gap && ++this.cmp > 0 && this.A[j - gap] > this.A[j];
                    j -= gap
                ) {
                    this.swap(j - gap, j);
                }
            }
        }
        return {
            method: 'shell',
            array: this.A,
            compares: this.cmp,
            assignments: this.asg
        };
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

    heapSort = () => {
        for (let h = this.A.length / 2 - 1; h >= 0; h--) {
            this.heapify(h, this.A.length);
        }
        for (let j = this.A.length - 1; j > 0; j--) {
            this.swap(0, j);
            this.heapify(0, j);
        }
        return {
            method: 'heapSort',
            array: this.A,
            compares: this.cmp,
            assignments: this.asg
        };
    };

    heapify = (root: number, size: number) => {
        let X = root;
        let L = 2 * X + 1;
        let R = L + 1;

        if (L < size && this.A[L] > this.A[X]) {
            X = L;
        }
        if (R < size && this.A[R] > this.A[X]) {
            X = R;
        }
        if (X === root) {
            return;
        }
        this.swap(root, X);
        this.heapify(X, size);
    };

    selection = () => {
        for (let j = this.A.length - 1; j > 0; j--) {
            this.swap(this.findMax(j), j);
        }
        return {
            method: 'selection',
            array: this.A,
            compares: this.cmp,
            assignments: this.asg
        };
    };

    findMax = (lastIndex: number) => {
        let maxIndex = 0;
        for (let i = 1; i <= lastIndex; i++) {
            if (this.A[i] > this.A[maxIndex]) {
                maxIndex = i;
            }
        }
        return maxIndex;
    };
}
