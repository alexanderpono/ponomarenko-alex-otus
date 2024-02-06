let worker;

document.addEventListener('DOMContentLoaded', () => {
    console.log('ui load');

    worker = new Worker('/js/worker.js');
    worker.postMessage({ type: 'initWS', payload: '' });

    worker.addEventListener('message', (event) => {
        switch (event.data.type) {
            case 'WS-message': {
                console.log('UI: received WS message=', event.data.payload);
                break;
            }
            default: {
                console.log('UI: received unknown message=', event.data);
            }
        }
    });
});
