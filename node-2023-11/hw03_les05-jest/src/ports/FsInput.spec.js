const { FsInput, DIRECTORY } = require('./FsInput');
const faker = require('faker');
const fs = require('fs');

jest.mock('fs', () => {
    const originalModule = jest.requireActual('fs');

    return {
        ...originalModule,
        promises: {
            opendir: jest.fn(),
            stat: jest.fn()
        }
    };
});

describe('FsInput', () => {
    test('.openDirectory() calls fs.promises.opendir()', () => {
        const fsInput = new FsInput();
        const rndStr = faker.datatype.string();
        fsInput.setMe(fsInput).openDirectory(rndStr);
        expect(fs.promises.opendir).toBeCalledWith(rndStr);
    });

    test('.getFileStats() calls fs.promises.stat()', () => {
        const fsInput = new FsInput();
        const rndStr = faker.datatype.string();
        fsInput.setMe(fsInput).getFileStats(rndStr);
        expect(fs.promises.stat).toBeCalledWith(rndStr);
    });

    describe('.getDirStats()', () => {
        const rndStr = faker.datatype.string();
        const rootPath = faker.datatype.string();
        const rndSize = faker.datatype.number();
        it('returns [] if depth = 0', async () => {
            const me = {};
            const result = await new FsInput().setMe(me).getDirStats(rootPath, rndStr, 0);
            expect(result).toEqual([]);
        });

        it('returns [{name, size}] if depth = 1 and directory has 1 file', async () => {
            const fileName = faker.datatype.string();
            const localDirPath = faker.datatype.string();
            const me = {
                openDirectory: () => [Promise.resolve({ name: fileName })],
                getFileStats: () =>
                    Promise.resolve({
                        isDirectory: () => false,
                        size: rndSize
                    })
            };
            const result = await new FsInput().setMe(me).getDirStats(rootPath, localDirPath, 1);
            expect(result).toEqual([
                {
                    name: localDirPath + '/' + fileName,
                    size: rndSize
                }
            ]);
        });

        it('returns [{name, size: DIRECTORY, emptyDir: true}] if depth = 1 and directory has 1 empty dir', async () => {
            const dirName = faker.datatype.string();
            const localDirPath = faker.datatype.string();
            const me = {
                openDirectory: (path) => {
                    return [Promise.resolve({ name: dirName })];
                },
                getFileStats: () =>
                    Promise.resolve({
                        isDirectory: () => true,
                        size: rndSize
                    }),
                getDirStats: () => Promise.resolve([])
            };
            const result = await new FsInput().setMe(me).getDirStats(rootPath, localDirPath, 1);
            expect(result).toEqual([
                {
                    name: localDirPath + '/' + dirName,
                    size: DIRECTORY,
                    emptyDir: true
                }
            ]);
        });

        it('returns [{name, size}] if depth = 2 and dir1 / dir2 / file', async () => {
            const rootPath = 'dir1';
            const dirName = 'dir2';
            const fileName = 'file';
            const localDirPath = '/';
            const me = {
                openDirectory: (path) => {
                    if (path === rootPath) {
                        return [Promise.resolve({ name: dirName })];
                    } else {
                        return [Promise.resolve({ name: fileName })];
                    }
                },
                getFileStats: () =>
                    Promise.resolve({
                        isDirectory: () => true,
                        size: rndSize
                    }),
                getDirStats: (rootPath, localDirPath, skipFiles, depth) =>
                    Promise.resolve([{ name: rootPath + '/' + fileName, size: rndSize }])
            };
            const result = await new FsInput().setMe(me).getDirStats(rootPath, localDirPath, 2);
            expect(result).toEqual([
                {
                    name: rootPath + '/' + dirName + '/' + fileName,
                    size: rndSize
                }
            ]);
        });
    });
});
