const WS_PORT = 8081;

const WebSocketServer = new require('ws');

const clients = {};

const webSocketServer = new WebSocketServer.Server({
    port: WS_PORT
});

webSocketServer.on('connection', function (ws) {
    const id = Math.random();
    clients[id] = ws;
    console.log('новое соединение ' + id);

    let time = 0;
    let step = 5000;
    let timer = setInterval(function () {
        time += step;
        const message = `server timeup time=${time}`;
        console.log(message);
        for (var key in clients) {
            clients[key].send(message);
        }
    }, step);

    ws.on('message', function (message) {
        console.log('получено сообщение ' + message);

        for (var key in clients) {
            clients[key].send('server: confirm received ' + message);
        }
    });

    ws.on('close', function () {
        console.log('соединение закрыто ' + id);
        delete clients[id];
        clearInterval(timer);
        timer = null;
    });
});
