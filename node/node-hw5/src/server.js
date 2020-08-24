var WebSocketServer = new require('ws');

// подключённые клиенты
var clients = {};

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
    port: 8081
});
webSocketServer.on('connection', function (ws) {
    var id = Math.random();
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
