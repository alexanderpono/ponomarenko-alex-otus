/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('hw04-les07-webservers:server');
var http = require('http');
var devcert = require('devcert');
const ENV = require('../constants').ENV;

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || ENV.REST_PORT);
app.set('port', port);

var server;

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening REST on ' + bind);
}

async function run() {
    /**
     * Create HTTP server.
     */

    // let ssl = await devcert.certificateFor('localhost');
    // server = http.createServer(ssl, app);
    server = http.createServer(app);
    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
}

run();
