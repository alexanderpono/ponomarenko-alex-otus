import { createFileWithNumbers } from './lib';

const minfileSize = 100 * 1024 * 1024;
const chunkSize = 100000;
const fileName = './100Mb.txt';
const maxRandomNumberInFile = 10000;

createFileWithNumbers(maxRandomNumberInFile, chunkSize, minfileSize, fileName).then(
    function resolved(len) {
        console.log(`created file ${fileName} with size=${len} bytes`);
        return Promise.resolve(len);
    },
    function rejected(err) {
        console.log(`createFileWithNumbers() error=`, err);
        return Promise.reject();
    }
);
