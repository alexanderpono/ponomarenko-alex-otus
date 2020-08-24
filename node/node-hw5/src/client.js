var socket;
window.wsInit = function () {
    console.log('wsInit()');
    socket = new WebSocket('ws://localhost:8081');
    socket.onopen = function () {
        console.log('ws-Соединение установлено.');
    };
    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log('ws-Соединение закрыто чисто');
        } else {
            console.log('ws-Обрыв соединения'); // например, "убит" процесс сервера
        }
        console.log('ws-Код: ' + event.code + ' причина: ' + event.reason);
        console.log('ws-Пауза 1 секунда');

        setTimeout(function () {
            console.log('ws-Повторное подключение...');
            window.wsInit();
        }, 1000);
    };

    // обработчик входящих сообщений
    socket.onmessage = function (event) {
        console.log('ws-Получены данные ' + event.data);
        var incomingMessage = event.data;
        showMessage(incomingMessage);
    };

    socket.onerror = function (error) {
        console.log('ws-Ошибка ' + error.message);
    };

    window.socket = socket;
};

// показать сообщение в div#subscribe
window.showMessage = function (message) {
    var messageElem = document.createElement('div');
    messageElem.appendChild(document.createTextNode(message));
    document.getElementById('subscribe').appendChild(messageElem);
};
