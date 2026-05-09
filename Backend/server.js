import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import {YSocketIO} from 'y-socket.io/dist/server';

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const ySocketIO = new YSocketIO(io);
ySocketIO.initialize();

//Health check route
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello World!",
        success: true
    });
});


app.get('/health', (req, res) => {
    res.status(200).json({
        message: "Hello World!",
        success: true
    });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});