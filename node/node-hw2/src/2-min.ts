import { parallelReadParts } from './lib';

parallelReadParts(5, './resultFile.txt').then(
    function resolved() {
        console.log('parallelReadParts() OK');
        return Promise.resolve();
    },
    function rejected(err) {
        console.log('parallelReadParts() error=', err);
        return Promise.reject(err);
    }
);
