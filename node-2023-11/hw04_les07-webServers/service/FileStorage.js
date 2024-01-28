const fs = require('fs');
var path = require('path');

class FileStorage {
    dir = null;
    constructor(dir) {
        this.dir = dir;
    }

    async clearStorageDir() {
        let dirHandle = null;
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

    openDirectory = async (path) => await fs.promises.opendir(path);
}

module.exports = {
    FileStorage
};
