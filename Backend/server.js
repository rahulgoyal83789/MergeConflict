import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import {YSocketIO} from 'y-socket.io/dist/server';
import path from 'path';
import {fileURLToPath} from 'url';
import { LeveldbPersistence } from 'y-leveldb'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const persistence = new LeveldbPersistence('./storage')

const ySocketIO = new YSocketIO(io, {
    gcEnabled: true,
    persistence: persistence 
})
ySocketIO.initialize();


app.use(express.static(path.join(__dirname, 'public')));
//Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        message: "Hello World!",
        success: true
    });
});

app.get('*path', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});