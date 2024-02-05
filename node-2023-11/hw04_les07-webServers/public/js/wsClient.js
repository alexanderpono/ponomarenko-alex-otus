let myWs = null;
createWs();

function createWs() {
    myWs = new WebSocket('ws://localhost:3100');
    myWs.onopen = function () {
        console.log('подключился');
    };
    myWs.onmessage = function (message) {
        console.log('%s', message.data);
        if (typeof window.notify === 'function') {
            let msg = message.data;
            try {
                msg = JSON.parse(message.data).fromServer;
            } catch {}
            console.log('msg=', msg);
            notify(msg);
        } else {
            console.error('onmessage() notify() is not defined');
        }
    };

    myWs.onclose = function () {
        console.log('отключился. Автоподключение через 5 сек...');
        setTimeout(() => {
            console.log('Попытка подключения к WS');
            createWs();
        }, 5000);
    };
}
