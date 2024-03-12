import fs from 'fs';
var path = require('path');

class FileStorageService {
    dir: string = '';
    constructor(dir: string) {
        this.dir = dir;
    }

    async clearStorageDir() {
        let dirHandle: fs.Dir;
        try {
            dirHandle = await this.openDirectory(this.dir);
        } catch (e) {
            fs.promises.mkdir(this.dir, { recursive: true });
            return;
        }
        for await (const dirent of dirHandle) {
            const fullFName = path.join(this.dir, dirent.name);

            fs.promises.unlink(fullFName);
        }
}

    openDirectory = async (path: string) => await fs.promises.opendir(path);
}

module.exports = {
    FileStorageService
};
