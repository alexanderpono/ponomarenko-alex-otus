const { description, name, version } = require('../package.json');

class Logger {
    log(...params) {
        console.log(...params);
    }

    printUsage() {
        console.log(`
Usage: index <inputFile> <outputFile>
Example: index ./data/1.txt ./data/1-out.txt
        `);
    }

    printAbout() {
        console.log(`\n\n${[name, description, version].join(' | ')}`);
    }
}

module.exports = {
    Logger
};
