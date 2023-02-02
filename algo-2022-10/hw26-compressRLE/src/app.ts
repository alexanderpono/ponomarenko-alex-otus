import { ArchiveRecord, PackRLE } from './PackRLE';
import { program } from 'commander';
import { assertParamIsSet } from './utils';
const { description, name, version } = require('../package.json');
import fs from 'fs';

export enum Scenario {
    pack = 'pack',
    unpack = 'unpack'
}

export interface Options {
    scenario: string;
    input: string;
    output: string;
    verbose: string;
}

program
    .name(name)
    .version(version)
    .description(description)
    .option('-s, --scenario <scenario>', 'scenario name')
    .option('-i, --input <input>', 'input file')
    .option('-o, --output <output>', 'output file')
    .option('-v, --verbose', 'show debug information')
    .parse(process.argv);

const options: Options = program.opts();
if (Object.keys(options).length === 0) {
    program.help();
}

switch (options.scenario) {
    case Scenario.pack: {
        console.log(`pack-RLE version ${version}`);
        assertParamIsSet(Scenario.pack, options.input, '-i <input>');
        assertParamIsSet(Scenario.pack, options.output, '-o <output>');
        pack(options);
        break;
    }

    case Scenario.unpack: {
        console.log(`pack-RLE version ${version}`);
        assertParamIsSet(Scenario.unpack, options.input, '-i <input>');
        assertParamIsSet(Scenario.unpack, options.output, '-o <output>');
        unpack(options);
        break;
    }
}

function pack(options: Options) {
    let inputSizeBytes = 0;
    fs.promises
        .readFile(options.input)
        .then((buffer: Buffer) => {
            options.verbose && console.log('read then() buffer=', buffer);
            const codes = PackRLE.bufferToCodesArray(buffer);
            inputSizeBytes = codes.length;
            options.verbose && console.log('read then() codes=', codes);
            const pack = PackRLE.create();
            const archive: ArchiveRecord[] = pack.packRLE(codes);
            return Promise.resolve(archive);
        })
        .then((archive: ArchiveRecord[]) => {
            options.verbose && console.log('packRLE() archive=', archive);
            const numbers: number[] = PackRLE.archiveDataToNumbers(archive);
            options.verbose && console.log('packRLE() numbers=', numbers);
            fs.promises
                .writeFile(options.output, Buffer.from(numbers))
                .then(() => {
                    const ratio = Math.floor((numbers.length / inputSizeBytes) * 100);
                    console.log(
                        `pack using RLE '${options.input}' -> '${options.output}' OK ${ratio}%`
                    );
                })
                .catch(() => {
                    console.log(`Error writing file '${options.output}'`);
                });
        })
        .catch(() => {
            console.log(`Error reading file '${options.input}'`);
        });
}

function unpack(options: Options) {
    fs.promises
        .readFile(options.input)
        .then((buffer: Buffer) => {
            options.verbose && console.log('read then() buffer=', buffer);
            const numbers = PackRLE.bufferToCodesArray(buffer);
            options.verbose && console.log('read then() numbers=', numbers);
            const archData: ArchiveRecord[] = PackRLE.numbersToArchiveData(numbers);
            const pack = PackRLE.create();
            const codes = pack.unpackRLE(archData);
            return Promise.resolve(codes);
        })
        .then((numbers: number[]) => {
            fs.promises
                .writeFile(options.output, Buffer.from(numbers))
                .then(() => {
                    console.log(`unpack using RLE '${options.input}' -> '${options.output}' OK`);
                })
                .catch(() => {
                    console.log(`Error writing file '${options.output}'`);
                });
        })
        .catch(() => {
            console.log(`Error reading file '${options.input}'`);
        });
}
