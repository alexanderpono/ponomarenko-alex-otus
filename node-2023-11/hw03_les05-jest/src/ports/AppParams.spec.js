const { AppParams } = require('./AppParams');
const faker = require('faker');

describe('AppParams', () => {
    test('.validateParams() does not call logger.log() if all is ok', () => {
        const rndStr = faker.datatype.string();
        const rndNum = faker.datatype.number();
        const logger = {
            log: jest.fn(),
            printUsage: () => {}
        };
        const appProcess = {
            exit: () => {}
        };
        const appParams = new AppParams(logger, appProcess);
        appParams.validateParams([rndStr, '-d', rndNum]);
        expect(logger.log).not.toHaveBeenCalled();
    });

    test('.parseParams() returns ({dirName, septh})', () => {
        const rndStr = faker.datatype.string();
        const rndNum = faker.datatype.number();
        const logger = {
            log: jest.fn(),
            printUsage: () => {}
        };
        const appProcess = {
            exit: () => {}
        };
        const appParams = new AppParams(logger, appProcess);
        appParams.parseParams([rndStr, '-d', rndNum]);
        expect(appParams.parseParams([rndStr, '-d', rndNum])).toEqual({
            dirName: rndStr,
            depth: rndNum
        });
    });

    describe('.validateParams()', () => {
        const rndStr = faker.datatype.string();
        test.each`
            testName                       | params                            | expected
            ${'params.length == 1'}        | ${[rndStr]}                       | ${'\nFATAL: not enough parameters'}
            ${'params.length == 2'}        | ${[rndStr, rndStr]}               | ${'\nFATAL: not enough parameters'}
            ${'params[1] != "-d"'}         | ${[rndStr, 'a' + rndStr, rndStr]} | ${'\nFATAL: parameter [1] must be = -d'}
            ${'params[2] is not a number'} | ${[rndStr, '-d', rndStr]}         | ${'\nFATAL: parameter [2] must be a number'}
        `('it calls logger.log with "$expected" if $testName', ({ params, expected }) => {
            const logger = {
                log: jest.fn(),
                printUsage: () => {}
            };
            const appProcess = {
                exit: () => {}
            };
            const appParams = new AppParams(logger, appProcess);
            appParams.validateParams(params);
            expect(logger.log).toHaveBeenCalledWith(expected);
        });
    });
});
