const { description, name, version } = require('../../package.json');

class Logger {
    log(...params) {
        console.log(...params);
    }

    printUsage() {
        console.log(`
Usage: tree <dirName> -d <depth>
Example: tree ./data -d 2
        `);
    }

    printAbout() {
        console.log(`\n\n${[name, description, version].join(' | ')}`);
    }
}

module.exports = {
    Logger
};
