export class UI {
    constructor(externalOnSubmit) {
        this.externalOnSubmit = externalOnSubmit;
    }

    renderMessage(message) {
        const messageElem = document.createElement('div');
        messageElem.appendChild(document.createTextNode(message));
        document.getElementById('subscribe').appendChild(messageElem);
    }

    notifyUser(message) {
        function doNotiFy() {
            const notification = new Notification(message);
            notification.onclose = function () {
                console.log('notification.onclose()');
            };
            notification.onshow = function () {
                console.log('notification.onshow()');
                setTimeout(function closeMe() {
                    notification.close();
                }, 2000);
            };
            notification.onclick = function () {
                console.log('notification.onclick()');
                notification.close();
            };
        }

        if (!('Notification' in window)) {
            alert('This browser does not support desktop notification');
        } else if (Notification.permission === 'granted') {
            doNotiFy();
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === 'granted') {
                    doNotiFy();
                }
            });
        }
    }

    setSubmitHandler() {
        const me = this;
        document.forms.publish.onsubmit = function (e) {
            e.preventDefault();

            const outgoingMessage = this.message.value;
            this.message.value = '';
            me.externalOnSubmit(outgoingMessage);

            return false;
        };
    }
}
