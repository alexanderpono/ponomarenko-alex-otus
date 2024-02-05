function notify_(message) {
    new Notification('Сообщение от поддержки', {
        body: message
    });
}

function notify(message) {
    if (!('Notification' in window)) {
        console.error('This browser does not support desktop notification');
        return;
    }

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
