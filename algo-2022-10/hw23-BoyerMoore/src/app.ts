import { Search } from './Search';

class Program {
    main() {
        const search = Search.create();
        const text = 'ABCD.CDBCDEABCDEF';
        const mask = 'ABCDEF';
        const x = search.searchFullScan(text, mask);
        console.log('searchFullScan() x=', x);
    }

    static create(): Program {
        return new Program();
    }
}

Program.create().main();
