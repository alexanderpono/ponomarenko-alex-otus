class AppParams {
    logger = null;
    appProcess = null;

    constructor(logger, appProcess) {
        this.logger = logger;
        this.appProcess = appProcess;
    }

    validateParams = (params) => {
        if (params.length < 2) {
            this.logger.log('\nFATAL: not enough parameters');
            this.logger.printUsage();
            this.appProcess.exit();
        }
    };

    parseParams = (params) => ({
        inFileName: params[0],
        outFileName: params[1]
    });
}

module.exports = {
    AppParams
};
