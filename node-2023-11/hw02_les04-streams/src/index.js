'use strict';
const fs = require('fs');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);
const { AppParams } = require('./AppParams');
const { Logger } = require('./Logger');
const { AppProcess } = require('./AppProcess');

const logger = new Logger();
const appParams = new AppParams(logger, new AppProcess());
const rawParams = process.argv.slice(2);

logger.printAbout();
appParams.validateParams(rawParams);
const params = appParams.parseParams(rawParams);

const readFile = fs.createReadStream(params.inFileName);
const writeFile = fs.createWriteStream(params.outFileName);

const tokenize = new stream.Transform({
    transform(chunk, encoding, next) {
        const input = chunk.toString();
        const re = /[\w\s]/i;
        const filteredChars = input
            .trim()
            .split('')
            .filter((char) => {
                return Boolean(char.match(re));
            });

        const tokens = [];
        let tokenAr = [];
        filteredChars.forEach((char) => {
            if (Boolean(char.trim())) {
                tokenAr.push(char);
            } else {
                const tokenS = tokenAr.join('');
                if (tokenS) {
                    tokens.push(tokenS);
                }
                tokenAr = [];
            }
        });
        const tokenS = tokenAr.join('');
        if (tokenS) {
            tokens.push(tokenS);
        }
        tokenAr = [];

        const output = tokens;
        console.log('tokenize in:', input);
        console.log('tokenize out:', output);

        output.forEach((token) => {
            this.push(token);
        });

        next();
    }
});

readFile.on('end', () => {
    console.log(`${params.inFileName} read`);
});

writeFile.on('open', () => {
    console.log(`${params.outFileName} open`);
});

const statsData = {};
const calcStats = new stream.Transform({
    transform(chunk, encoding, next) {
        console.log('calcStats in:', chunk.toString());
        if (!statsData[chunk.toString()]) {
            statsData[chunk.toString()] = 1;
        } else {
            statsData[chunk.toString()]++;
        }
        next();
    },
    flush(next) {
        this.push(JSON.stringify(statsData));
        next();
    }
});

const formatStats = new stream.Transform({
    transform(chunk, encoding, next) {
        const input = chunk.toString();
        const entries = Object.entries(JSON.parse(input)).sort((a, b) => {
            if (a[0] > b[0]) {
                return 1;
            }
            if (a[0] < b[0]) {
                return -1;
            }
            return 0;
        });
        console.log('formatStats in:', input);
        console.log('formatStats entries:', entries);
        const values = entries.map((entry) => entry[1]);
        console.log('formatStats values:', values);
        const output = values.join(',');
        console.log('formatStats out:', output);
        this.push(output.toString());
        next();
    }
});

async function run() {
    const a = await pipeline(readFile, tokenize, calcStats, formatStats, writeFile);
    console.log('finish a=', a);

    pipeline(readFile, tokenize, calcStats)
        .then((a) => {
            console.log('pipeline a');
        })
        .catch(() => {
            console.log('pipeline catch');
        });
}

run()
    .catch(console.error)
    .then(() => {
        console.log('then()');
    });
