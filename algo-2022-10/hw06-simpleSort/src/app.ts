import { Sort } from './Sort';

class App {
    doSort(method: string) {
        for (let N = 100; N <= 100000; N *= 10) {
            const sort = new Sort();
            sort.setRandom(N);
            const start = Date.now();
            const result = sort[method]();
            const end = Date.now();
            console.log(`${result.method} N:${result.array.length} time: ${end - start}`);
        }
    }

    main() {
        this.doSort('bubble');
        this.doSort('insertion');
        this.doSort('insertionShift');
        this.doSort('insertionBinarySearch');
        this.doSort('shell');
    }

    static create(): App {
        return new App();
    }
}

App.create().main();
