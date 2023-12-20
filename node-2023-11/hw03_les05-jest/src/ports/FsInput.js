const fs = require('fs');

const DIRECTORY = -1;

class FsInput {
    setMe(me) {
        this.me = me;
        return this;
    }
    openDirectory = async (path) => await fs.promises.opendir(path);
    getFileStats = async (filePath) => await fs.promises.stat(filePath);
    getDirStats = async (rootPath, localDirPath, depth) => {
        const result = [];
        if (depth === 0) {
            return [];
        }
        const dirHandle = await this.me.openDirectory(rootPath);
        for await (const dirent of dirHandle) {
            const filePath = rootPath + '/' + dirent.name;
            const localPath = localDirPath + '/' + dirent.name;
            const stats = await this.me.getFileStats(filePath);
            const isDirectory = stats.isDirectory();
            const size = isDirectory ? DIRECTORY : stats.size;
            if (stats.isDirectory() && depth > 0) {
                const subResult = await this.me.getDirStats(filePath, localPath, depth - 1);
                if (Object.keys(subResult).length === 0) {
                    result.push({
                        name: localPath,
                        size: DIRECTORY,
                        emptyDir: true
                    });
                }
                Object.entries(subResult).forEach(([path, data]) => {
                    result.push(data);
                });
                continue;
            }
            result.push({ name: localPath, size });
        }

        return result;
    };
}

module.exports = {
    FsInput,
    DIRECTORY
};
