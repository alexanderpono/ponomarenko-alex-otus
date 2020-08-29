console.log('worker.js!');

self.onmessage = messagesFromMainJS;

function messagesFromMainJS(event) {
    const message = event.data;
    console.log('worker.js message from main JS=', message);
    if (message === 'DOMContentLoaded') {
        websocket.init();
    } else {
        websocket.send(message);
    }
}

function messagesFromWS(incomingMessage) {
    console.log('worker.js message from WS=', incomingMessage);
    postMessage(incomingMessage);
}

var websocket = new WebSocketClient(messagesFromWS, 8081);

function WebSocketClient(externalOnMessage, WS_PORT) {
    var wsClient = {
        socket: null,
        externalOnMessage: externalOnMessage,

        onopen: function () {
            console.log('ws:Соединение установлено.');
        },

        onmessage: function (event) {
            console.log('ws:Получены данные: ' + event.data);
            const incomingMessage = event.data;
            wsClient.externalOnMessage(incomingMessage);
        },

        onclose: function (event) {
            if (event.wasClean) {
                console.log('ws:Соединение закрыто чисто');
            } else {
                console.log('ws:Обрыв соединения'); // например, "убит" процесс сервера
            }
            console.log('ws:Код: ' + event.code + ' причина: ' + event.reason);
            console.log('ws:Пауза 1 секунда');

            setTimeout(function () {
                console.log('ws:Повторное подключение...');
                wsClient.init();
            }, 1000);
        },

        onerror: function (error) {
            console.log('ws:Ошибка ' + error.message);
        },

        init: function () {
            console.log('ws::init()');
            this.socket = new WebSocket('ws://localhost:' + WS_PORT);
            this.socket.onopen = this.onopen;
            this.socket.onclose = this.onclose;
            this.socket.onmessage = this.onmessage;
            this.socket.onerror = this.onerror;
        },

        send: function (message) {
            console.log('ws:send() message=', message);
            this.socket.send(message);
        }
    };

    return wsClient;
}
