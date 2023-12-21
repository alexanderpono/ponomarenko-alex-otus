const { FsInput } = require('./ports/FsInput');
const { AppParams } = require('./ports/AppParams');
const { Logger } = require('./ports/Logger');
const { AppProcess } = require('./ports/AppProcess');
const { Graph } = require('./Graph');
const { App } = require('./App');

const logger = new Logger();
const appParams = new AppParams(logger, new AppProcess());
const rawParams = process.argv.slice(2);

new App(logger, appParams, new FsInput(), new Graph()).main(rawParams);
