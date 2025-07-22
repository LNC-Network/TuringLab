import {Server, OPEN} from 'ws';


export function initWebSocket(server) {
    const wss = new Server({server});

    wss.on('connection', (ws) => {
        console.log('WS Listener established');

        ws.on('message', async (message) => {
            const response = await LogToLLM(message.toString());
            if(ws.readyState === OPEN) {
                ws.send(response);
            }
        });


    });
}
