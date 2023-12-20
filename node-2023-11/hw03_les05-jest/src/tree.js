const { FsInput } = require('./ports/FsInput');
const { AppParams } = require('./ports/AppParams');
const { Logger } = require('./ports/Logger');
const { AppProcess } = require('./ports/AppProcess');
const { Graph, dir } = require('./Graph');

const logger = new Logger();
const appParams = new AppParams(logger, new AppProcess());
const rawParams = process.argv.slice(2);

logger.printAbout();
appParams.validateParams(rawParams);

const params = appParams.parseParams(rawParams);
const fsInput = new FsInput();
fsInput
    .setMe(fsInput)
    .getDirStats(params.dirName, '', params.depth)
    .then((foundFiles) => {
        const sorted = foundFiles.sort((a, b) => {
            if (a.name === b.name) {
                return 0;
            }
            return a.name < b.name ? -1 : 1;
        });

        const treeLines = new Graph().draw(sorted);

        console.log(dir(params.dirName));
        console.log(treeLines.join('\n'));
    });
