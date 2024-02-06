console.log('worker load');

const WS_URL = 'ws://localhost:3100';
let myWs = null;

addEventListener('message', (event) => {
    console.log('worker IN message=', event.data);
    if (event.data.type === 'initWS') {
        initWS();
    }
});

function initWS() {
    myWs = new WebSocket(WS_URL);
    myWs.onopen = function () {
        console.log('worker WS: подключился');
    };
    myWs.onmessage = function (message) {
        let msg = message.data;
        try {
            msg = JSON.parse(message.data).fromServer;
        } catch {}
        console.log('worker WS: IN msg=', msg);
        notify(msg);
        wsMessageToApp(msg);
    };

    myWs.onclose = function () {
        console.log('отключился. Автоподключение через 5 сек...');
        setTimeout(() => {
            console.log('Попытка подключения к WS');
            createWs();
        }, 5000);
    };
}

function notify_(message) {
    const n = new Notification('Сообщение от поддержки', {
        body: message
    });
    setTimeout(() => {
        n.close();
    }, 2000);
}

function notify(message) {
    if (Notification.permission === 'granted') {
        notify_(message);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                notify_(message);
            }
        });
    }
}

function wsMessageToApp(msg) {
    postMessage({ type: 'WS-message', payload: msg });
}
