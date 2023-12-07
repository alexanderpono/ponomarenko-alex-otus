const fs = require('fs');

class FsInput {
    openDirectory = async (path) => await fs.promises.opendir(path);
    getFileStats = async (filePath) => await fs.promises.stat(filePath);
    getDirStats = async (
        rootPath,
        localDirPath,
        skipFiles,
        depth
    ) => {
        const result = [];
        const dirHandle = await this.openDirectory(rootPath);
        const toSkip = new Set(skipFiles);
        for await (const dirent of dirHandle) {
            if (toSkip.has(dirent.name)) {
                console.log(`skipping ${dirent.name}`);
                continue;
            }
            const filePath = rootPath + '/' + dirent.name;
            const localPath = localDirPath + '/' + dirent.name;
            const stats = await this.getFileStats(filePath);
            const isDirectory = stats.isDirectory();
            const size = isDirectory ? DIRECTORY : stats.size;
            if (stats.isDirectory() && depth > 0) {
                const subResult = await this.getDirStats(filePath, localPath, skipFiles, depth - 1);
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
    FsInput    
}