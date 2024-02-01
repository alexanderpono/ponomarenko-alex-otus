const { WebSocket } = require('ws');

class WsService {
    wsServer;
    wsClient;

    run(port) {
        console.log('Listening WS on ' + port);
        this.wsServer = new WebSocket.Server({ port });
        this.wsServer.on('connection', this.onConnect);
    }

    onConnect = (wsClient) => {
        this.wsClient = wsClient;
        console.log('Ws: Новый пользователь');
        this.wsClient.send(JSON.stringify({ fromServer: 'Привет' }));
        this.wsClient.on('message', this.onMessage);

        this.wsClient.on('close', function () {
            console.log('Ws: Пользователь отключился');
        });
    };

    onMessage = (messageB) => {
        const message = messageB.toString('utf-8');
        this.ctrl.onWsMesage(message);
    };

    send = (s) => {
        this.wsClient.send(s);
    };
}

module.exports = {
    WsService
};
