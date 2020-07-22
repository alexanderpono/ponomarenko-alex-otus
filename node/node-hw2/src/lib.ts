import fs from 'fs';
import util from 'util';

export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

export function createNumbersString(numberMax: number, stringLength: number): string {
    let result = '';
    const cr = '\n';
    const maxloop = 100000;

    for (let i = 0; i < maxloop && result.length < stringLength; i++) {
        const int = getRandomInt(numberMax);
        if (i > 0) {
            result += cr;
        }
        result += String(int);
    }

    return result;
}

export function createFileWithNumbers(
    numberMax: number,
    portionSize: number,
    minfileSize: number,
    fileName: string
): number {
    const ws = fs.createWriteStream(fileName);
    const maxloop = 1000 * 1000;
    const cr = '\n';

    let fileSize = 0;

    for (let i = 0; i < maxloop && fileSize < minfileSize; i++) {
        let s = createNumbersString(numberMax, portionSize);
        if (i > 0 && s[s.length - 1] !== '\n') {
            s = cr + s;
        }
        fileSize += s.length;
        console.log(`createFileWithNumbers().${i}: written ${s.length}, current size=${fileSize}`);
        ws.write(s);
    }

    ws.end();

    return fileSize;
}

function getFileSizePromise(fName: string) {
    const promiseStat = util.promisify(fs.stat);
    return promiseStat(fName)
        .then((stats) => {
            return Promise.resolve(stats.size);
        })
        .catch(() => {
            return Promise.reject('promiseStat()');
        });
}

export function splitFile(fName: string, partsNumber: number): Promise<void> {
    console.log(`splitting file ${fName} into ${partsNumber} parts`);
    const fileSizePromise = getFileSizePromise(fName);
    return fileSizePromise
        .then((size) => {
            console.log(`source file size=${size} bytes`);
            splitFile2(fName, size, partsNumber);
            return Promise.resolve();
        })
        .catch((err) => {
            console.log('err=', err);
            return Promise.reject(err);
        });
}

export function readFile(fName: string): void {
    const inputStream = fs.createReadStream(fName);
    let readSize = 0;
    let counter = 0;
    inputStream
        .on('data', (chunk) => {
            const s = chunk.toString();
            readSize += s.length;
            counter++;
            console.log(`readFile().${counter} chunk size=${s.length} total size=${readSize}`);
        })
        .on('end', () => {
            console.log('readFile() readSize=', readSize);
        });
}

function splitFile2(fName: string, sourceFileSize: number, partsNumber: number): void {
    const openNewOutputFile = (targetFileNumber: number) => {
        const targetFileName = `part${targetFileNumber}.txt`;
        const outputStream = fs.createWriteStream(targetFileName);
        console.log(`splitFile2(): writing ${targetFileName}`);
        return outputStream;
    };

    const splitStringBetweenOutputFiles = (s: string) => {
        const sAr = s.split('\n');
        const tailString = sAr.pop();
        const toPreviousFile = sAr.join('\n');
        return {
            toPreviousFile,
            toNextFile: tailString
        };
    };

    const inputStream = fs.createReadStream(fName);
    let readSize = 0;
    let targetFileNumber = 1;
    let outputStream = openNewOutputFile(targetFileNumber);
    const targetFileSize = Math.ceil(sourceFileSize / partsNumber);
    let sizeToChangeTargetFile = readSize + targetFileSize;
    inputStream
        .on('data', (chunk) => {
            const s = chunk.toString();
            readSize += s.length;
            if (readSize > sizeToChangeTargetFile) {
                const { toPreviousFile, toNextFile } = splitStringBetweenOutputFiles(s);

                outputStream.write(toPreviousFile);
                outputStream.end();
                targetFileNumber++;
                outputStream = openNewOutputFile(targetFileNumber);
                outputStream.write(toNextFile);

                sizeToChangeTargetFile = readSize + targetFileSize;
            } else {
                outputStream.write(chunk);
            }
        })
        .on('end', () => {
            outputStream.end();
        });
}
