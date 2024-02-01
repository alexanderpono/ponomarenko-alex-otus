console.log('wsClient!');

let myWs = null;
createWs();

function createWs() {
    myWs = new WebSocket('ws://localhost:3100');
    myWs.onopen = function () {
        console.log('подключился');
    };
    myWs.onmessage = function (message) {
        console.log('%s', message.data);
    };

    myWs.onclose = function () {
        console.log('отключился. Автоподключение через 5 сек...');
        setTimeout(() => {
            console.log('Попытка подключения к WS');
            createWs();
        }, 5000);
    };
}
