const express = require('express');

const ENV = require('./constants').ENV;

const { WsService } = require('./services/WsService');
const { RestService } = require('./services/RestService');

let rest = null;
let app = express();
let ws = null;

runRestService();
runWsService();

function runRestService() {
    rest = new RestService();
    rest.run(app);
}

function runWsService() {
    ws = new WsService();
    ws.run(ENV.WS_PORT);
}

module.exports = app;
