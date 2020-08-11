import { parallelReadParts, createFileWithNumbers, splitFile } from './lib';

const minfileSize = 100 * 1024 * 1024;
const chunkSize = 100000;
const fileName = './100Mb.txt';
const maxRandomNumberInFile = 10000;
const targetNumberOfFiles = 5;

createFileWithNumbers(maxRandomNumberInFile, chunkSize, minfileSize, fileName)
    .then(
        function resolved(len) {
            console.log(`created file ${fileName} with size=${len} bytes`);
            return Promise.resolve(len);
        },
        function rejected(err) {
            console.log(`createFileWithNumbers() error=`, err);
            return Promise.reject();
        }
    )
    .then(function resolved(len) {
        return splitFile(fileName, targetNumberOfFiles, len);
    })
    .then(
        function resolved() {
            console.log(`file ${fileName} is splitted into ${targetNumberOfFiles} parts!`);
            return Promise.resolve();
        },
        function rejected(err) {
            console.log('file split error!');
            return Promise.reject(err);
        }
    )
    .then(function resolved() {
        return parallelReadParts(5, './resultFile.txt');
    })
    .then(
        function resolved() {
            console.log('parallelReadParts() OK');
            return Promise.resolve();
        },
        function rejected(err) {
            console.log('parallelReadParts() error=', err);
            return Promise.reject(err);
        }
    )
    .then(function resolved() {
        console.log('run OK!');
    })
    .catch(function (err) {
        console.log('run error=', err);
    });
