import { splitFile } from './lib';

const fileName = './100Mb.txt';
const targetNumberOfFiles = 5;

splitFile(fileName, targetNumberOfFiles);
