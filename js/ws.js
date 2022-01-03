const urlParams = new URLSearchParams(window.location.search);
const ip = urlParams.get('ip') || '127.0.0.1';
const port = urlParams.get('port') || '12345';

const ws = new WebSocket(`ws://${ip}:${port}`);

ws.addEventListener('open', () => {
    let msg = {
        client_config: {
            client_name: 'JS Test',
            update_interval: '20',
            event_subscriptions: eventTypes,
        },
    };

    ws.send(JSON.stringify(msg));
});

ws.addEventListener('message', (message) => {
    const data = JSON.parse(message.data);
    const event = events[Object.keys(data)[0]];

   if(event) {
       event(data);
   }
});