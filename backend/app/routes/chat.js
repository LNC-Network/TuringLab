import {Router} from 'express';
import {createServer} from 'http';
import {Server, OPEN} from 'ws';

const router = Router();

// Create HTTP server and WebSocket server
const server = createServer();
const wss = new Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast received message to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === OPEN) {
                client.send(message);
            }
        });
    });

    ws.send('Welcome to the chat!');
});

// Optional: Express route for health check
router.get('/ws-health', (req, res) => {
    res.json({ status: 'WebSocket server running', clients: wss.clients.size });
});

// Export router and server for use in main app
export default { router, server };