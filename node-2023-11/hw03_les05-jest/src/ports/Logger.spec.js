const { Logger } = require('./Logger');
const faker = require('faker');
const { description, name, version } = require('../../package.json');

// jest.spyOn(global.console, 'log');

describe('Logger', () => {
    let stdConsole;
    beforeAll(() => {
        stdConsole = console;
        global.console = {
            log: jest.fn()
        };
    });
    afterAll(() => {
        global.console = stdConsole;
    });
    test('.log() calls console.log()', () => {
        const rndStr = faker.datatype.string();
        const logger = new Logger();
        logger.log(rndStr);
        expect(console.log).toBeCalledWith(rndStr);
    });

    test('.printUsage() prints about text', () => {
        const logger = new Logger();
        logger.printUsage();
        expect(console.log).toBeCalledWith(`
Usage: tree <dirName> -d <depth>
Example: tree ./data -d 2
        `);
    });

    test('.printAbout() calls console.log', () => {
        const logger = new Logger();
        logger.printAbout();

        const expected = `\n\n${[name, description, version].join(' | ')}`;
        expect(console.log).toBeCalledWith(expected);
    });
});
