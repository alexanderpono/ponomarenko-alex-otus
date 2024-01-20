const { dir } = require('./Graph');

class App {
    constructor(logger, appParams, fsInput, graph) {
        this.logger = logger;
        this.appParams = appParams;
        this.fsInput = fsInput;
        this.graph = graph;
    }

    main(rawParams) {
        this.logger.printAbout();
        this.appParams.validateParams(rawParams);

        const params = this.appParams.parseParams(rawParams);
        this.fsInput.getDirStats(params.dirName, '', params.depth).then((foundFiles) => {
            const sorted = foundFiles.sort((a, b) => {
                if (a.name === b.name) {
                    return 0;
                }
                return a.name < b.name ? -1 : 1;
            });

            const treeLines = this.graph.draw(sorted);

            this.logger.log(dir(params.dirName));
            this.logger.log(treeLines.join('\n'));
        });
    }
}

module.exports = {
    App
};
