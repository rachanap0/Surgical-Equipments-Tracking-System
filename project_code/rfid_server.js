// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const socketIo = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    const io = socketIo(server);
    io.on('connection', socket => {
        console.log('A client connected.');

        socket.on('initiateScanForOrder', (data) => {
            console.log(`Ready to scan RFID for order ${data.orderId}. Waiting for hardware response...`);
        });

        socket.on('rfidScan', (data) => {
            console.log(`Received RFID tag:${data.tagId} from hardware`);
            io.emit('rfidScan', data); 
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    server.listen(3000, () => {
        console.log('> Ready on http://localhost:3000');
    });
});
