export interface IGetPrimeNumbersCount {
    getPrimeNumbersCount: (N: number) => number;
}

export class BruteForceMethod implements IGetPrimeNumbersCount {
    public getPrimeNumbersCount(N: number): number {
        let count = 0;
        for (let i = 2; i <= N; i++) {
            if (this.isPrime(i)) {
                count++;
            }
        }
        return count;
    }

    private isPrime(N: number): boolean {
        let dividersCount = 0;
        for (let number = 1; number <= N; number++) {
            if (N % number === 0) {
                dividersCount++;
            }
        }
        return dividersCount === 2;
    }
}
