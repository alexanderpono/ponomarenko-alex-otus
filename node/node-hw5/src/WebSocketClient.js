import { WS_PORT } from './const';

export class WebSocketClient {
    constructor(onmessage) {
        this.socket = null;
        this.onclose = this.onclose.bind(this);
        this.onmessage = this.onmessage.bind(this);
        this.externalOnMessage = onmessage;
    }

    onopen() {
        console.log('ws-Соединение установлено.');
    }

    onmessage(event) {
        console.log('ws-Получены данные ' + event.data);
        const incomingMessage = event.data;
        this.externalOnMessage(incomingMessage);
    }

    onclose(event) {
        const me = this;
        if (event.wasClean) {
            console.log('ws-Соединение закрыто чисто');
        } else {
            console.log('ws-Обрыв соединения'); // например, "убит" процесс сервера
        }
        console.log('ws-Код: ' + event.code + ' причина: ' + event.reason);
        console.log('ws-Пауза 1 секунда');

        setTimeout(function () {
            console.log('ws-Повторное подключение...');
            me.init();
        }, 1000);
    }

    onerror(error) {
        console.log('ws-Ошибка ' + error.message);
    }

    init() {
        console.log('Ws::init()');
        this.socket = new WebSocket(`ws://localhost:${WS_PORT}`);
        this.socket.onopen = this.onopen;
        this.socket.onclose = this.onclose;
        this.socket.onmessage = this.onmessage;
        this.socket.onerror = this.onerror;
    }
}
