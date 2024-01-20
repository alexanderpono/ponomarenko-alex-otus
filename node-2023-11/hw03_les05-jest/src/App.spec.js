const { App } = require('./App');

describe('App', () => {
    test('.main() runs', async () => {
        const logger = {
            log: jest.fn(),
            printAbout: jest.fn()
        };
        const appParams = {
            validateParams: () => {},
            parseParams: () => ({ depth: 2, dirName: '' })
        };
        const fsInput = {
            getDirStats: () =>
                Promise.resolve([
                    { name: '/1.txt', size: 0 },
                    { name: '/dir1/3.txt', size: 0 },
                    { name: '/dir1/2.txt', size: 0 }
                ])
        };
        const graph = {
            draw: () => ['aaa']
        };
        const rawParams = {};

        await new App(logger, appParams, fsInput, graph).main(rawParams);

        expect(logger.printAbout).toHaveBeenCalledTimes(1);
        expect(logger.log).toHaveBeenCalledTimes(2);
    });
});
