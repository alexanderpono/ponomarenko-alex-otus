import { UI } from './UI';

var myWorker = new Worker('worker.js');

const ui = new UI(function onSubmit(outgoingMessage) {
    console.log('onSubmit() outgoingMessage=', outgoingMessage);
    myWorker.postMessage(outgoingMessage);
});

myWorker.onmessage = function (e) {
    const incomingMessage = e.data;
    console.log('client.js: Message from worker=', incomingMessage);
    ui.renderMessage(incomingMessage);
    ui.notifyUser(incomingMessage);
};

document.addEventListener('DOMContentLoaded', function () {
    ui.setSubmitHandler();
    myWorker.postMessage('DOMContentLoaded');
});
