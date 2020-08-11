import { splitFile } from './lib';

const fileName = './100Mb.txt';
const targetNumberOfFiles = 5;

splitFile(fileName, targetNumberOfFiles, 0).then(
    function resolved() {
        console.log('file is splitted!');
    },
    function rejected(err) {
        console.log('file split error!');
        return Promise.reject(err);
    }
);
