import { parallelReadParts, createFileWithNumbers, splitFile } from './lib';

const minfileSize = 100 * 1024 * 1024;
const chunkSize = 100000;
const fileName = './100Mb.txt';
const maxRandomNumberInFile = 10000;
const len = createFileWithNumbers(maxRandomNumberInFile, chunkSize, minfileSize, fileName);
console.log(`created file ${fileName} with size=${len} bytes`);

const targetNumberOfFiles = 5;
splitFile(fileName, targetNumberOfFiles, len);

parallelReadParts(5, './resultFile.txt');
