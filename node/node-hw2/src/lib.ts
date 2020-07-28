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

export function splitFile(fName: string, partsNumber: number, len: number): Promise<void> {
    console.log(`splitting file ${fName} into ${partsNumber} parts`);
    if (len === 0) {
        const fileSizePromise = getFileSizePromise(fName);
        return fileSizePromise
            .then((size) => {
                console.log(`source file size=${size} bytes`);
                splitFileAndSort(fName, size, partsNumber);
                return Promise.resolve();
            })
            .catch((err) => {
                console.log('err=', err);
                return Promise.reject(err);
            });
    } else {
        splitFileAndSort(fName, len, partsNumber);
        return Promise.resolve();
    }
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

function splitFileAndSort(fName: string, sourceFileSize: number, partsNumber: number): void {
    const openNewOutputFile = (targetFileNumber: number) => {
        const targetFileName = `part${targetFileNumber}.txt`;
        const outputStream = fs.createWriteStream(targetFileName);
        console.log(`splitFileAndSort(): sorting and writing ${targetFileName}`);
        return outputStream;
    };

    const splitStringBetweenOutputFiles = (s: string) => {
        const sAr = s.split('\n');
        let tailString = sAr.pop();
        if (typeof tailString === 'undefined') {
            tailString = '';
        }
        const toPreviousFile: string = sAr.join('\n');
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
    let smallFileContent: string[] = [];

    const sortAndWriteSmallFile = () => {
        let smallFileContentS = smallFileContent.join('');
        smallFileContent = [];

        let smallFileContentLines = smallFileContentS.split('\n');
        smallFileContentS = '';
        // let smallFileContentNumbers = smallFileContentLines.map((item) => parseInt(item));
        // smallFileContentLines = [];
        smallFileContentLines.sort(function (a, b) {
            if (parseInt(a) > parseInt(b)) {
                return 1;
            } else {
                return -1;
            }
        });
        // smallFileContentLines = smallFileContentNumbers.map((item) => String(item));
        // smallFileContentNumbers = [];
        smallFileContentS = smallFileContentLines.join('\n');
        smallFileContentLines = [];

        outputStream.write(smallFileContentS);
    };

    inputStream
        .on('data', (chunk) => {
            const chunkS = chunk.toString();
            readSize += chunkS.length;
            if (readSize > sizeToChangeTargetFile) {
                const { toPreviousFile, toNextFile } = splitStringBetweenOutputFiles(chunkS);

                smallFileContent.push(toPreviousFile);

                sortAndWriteSmallFile();
                outputStream.end();
                targetFileNumber++;
                outputStream = openNewOutputFile(targetFileNumber);
                smallFileContent.push(toNextFile);

                sizeToChangeTargetFile = readSize + targetFileSize;
            } else {
                smallFileContent.push(chunkS);
            }
        })
        .on('end', () => {
            sortAndWriteSmallFile();
            outputStream.end();
        });
}

export function parallelReadParts(partsNumber: number, resultFileName: string): void {
    const streams: fs.ReadStream[] = [];
    const chunksTails: string[] = [];
    const chunksCompare: string[] = [];
    const activeStreams: boolean[] = [];
    const chunkReady: boolean[] = [];
    const outputStream = fs.createWriteStream(resultFileName);
    let writtenLines = 0;

    const clearChunkReady = (): void => {
        for (let i = 0; i < partsNumber; i++) {
            chunkReady[i] = false;
        }
    };

    for (let i = 0; i < partsNumber; i++) {
        const fileName = `./part${i + 1}.txt`;
        const inputStream = fs.createReadStream(fileName);
        console.log(`reading file ${fileName}`);
        streams.push(inputStream);
        chunksTails[i] = '';
        chunksCompare[i] = '';
        activeStreams[i] = true;
    }

    clearChunkReady();

    const allChunksReady = (): boolean => {
        let allReady = true;
        for (let i = 0; i < partsNumber; i++) {
            if (activeStreams[i] && !chunkReady[i]) {
                allReady = false;
            }
        }
        return allReady;
    };

    const getMinNumber = (): number => {
        let minNumber = 20000;
        for (let i = 0; i < partsNumber; i++) {
            if (activeStreams[i] && parseInt(chunksCompare[i]) < minNumber) {
                minNumber = parseInt(chunksCompare[i]);
            }
        }
        return minNumber;
    };

    const resumeStreams = (): void => {
        for (let i = 0; i < partsNumber; i++) {
            if (activeStreams[i]) {
                const inputStream = streams[i];
                inputStream.resume();
            }
        }
    };

    const writeMinNumber = (minNumber: number): void => {
        if (minNumber !== 20000) {
            // console.log('compareChunks() minNumber=', minNumber);
            outputStream.write(`${minNumber}\n`);
            writtenLines++;
        } else {
            outputStream.end();
            console.log(`result file "${resultFileName}" is written (${writtenLines} lines)`);
        }
    };

    const compareChunks = (): void => {
        if (!allChunksReady()) {
            return;
        }
        const minNumber = getMinNumber();
        writeMinNumber(minNumber);
        clearChunkReady();
        resumeStreams();
    };

    const getFirstLine = (chunkLines: string[], chunkPrevTail: string): string => {
        const chunkStart = chunkLines[0];
        const fistLine = chunkPrevTail + chunkStart;
        return fistLine;
    };
    const getLastLine = (chunkLines: string[]): string => {
        const lastLine = chunkLines[chunkLines.length - 1];
        return lastLine;
    };

    for (let i = 0; i < partsNumber; i++) {
        const inputStream = streams[i];
        inputStream.on('data', (chunk) => {
            inputStream.pause();
            const chunkS = chunk.toString();
            const chunkLines = chunkS.split('\n');
            const fistLine = getFirstLine(chunkLines, chunksTails[i]);
            const lastLine = getLastLine(chunkLines);

            chunksCompare[i] = fistLine;
            chunksTails[i] = lastLine;
            chunkReady[i] = true;

            compareChunks();
        });

        inputStream.on('end', () => {
            console.log(`${i} Reached end of stream.`);
            activeStreams[i] = false;
            compareChunks();
        });
    }
}
