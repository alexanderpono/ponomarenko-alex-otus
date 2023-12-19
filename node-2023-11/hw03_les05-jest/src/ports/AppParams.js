class AppParams {
    logger = null;
    appProcess = null;

    constructor(logger, appProcess) {
        this.logger = logger;
        this.appProcess = appProcess;
    }

    validateParams = (params) => {
        if (params.length < 3) {
            this.logger.log('\nFATAL: not enough parameters');
            this.logger.printUsage();
            this.appProcess.exit();
            return;
        }

        if (params[1] != '-d') {
            this.logger.log('\nFATAL: parameter [1] must be = -d');
            this.logger.printUsage();
            this.appProcess.exit();
            return;
        }

        if (isNaN(parseInt(params[2]))) {
            this.logger.log('\nFATAL: parameter [2] must be a number');
            this.logger.printUsage();
            this.appProcess.exit();
            return;
        }
    };

    parseParams = (params) => ({
        dirName: params[0],
        depth: parseInt(params[2])
    });
}

module.exports = {
    AppParams
};
