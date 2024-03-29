import { Sort } from './Sort';

class App {
    doSort(method: string, maxN: number) {
        for (let N = 100; N <= maxN; N *= 10) {
            const sort = new Sort();
            sort.setRandom(N);
            const start = Date.now();
            const result = sort[method]();
            const end = Date.now();
            console.log(`${result.method} N:${result.array.length} time: ${end - start}`);
        }
    }

    main() {
        this.doSort('bubble', 100000);
        this.doSort('insertion', 100000);
        this.doSort('insertionShift', 100000);
        this.doSort('insertionBinarySearch', 100000);
        this.doSort('shell', 1000000);
        this.doSort('selection', 100000);
        this.doSort('heapSort', 1000000);
    }

    static create(): App {
        return new App();
    }
}

App.create().main();
