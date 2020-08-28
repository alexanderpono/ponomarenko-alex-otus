import { WebSocketClient } from './WebSocketClient';
import { UI } from './UI';

let websocket;
const ui = new UI(function onSubmit(outgoingMessage) {
    websocket.send(outgoingMessage);
});

websocket = new WebSocketClient(function onMessage(incomingMessage) {
    console.log('incomingMessage=', incomingMessage);
    ui.renderMessage(incomingMessage);
    ui.notifyUser(incomingMessage);
});

document.addEventListener('DOMContentLoaded', function () {
    websocket.init();
    ui.setSubmitHandler();
});
