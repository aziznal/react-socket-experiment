import express from "express";
import http from 'http';
import { Server } from 'socket.io';

const serverPort = 3000;
const socketPort = 3001;

const app = express();

const socketServer = http.createServer(app);
const io = new Server(socketServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    "/",
    async (req, res) => {
        return res.status(200).send({
            message: "Hello World!",
        });
    }
);

app.listen(serverPort, () => {
    console.log(`Connected successfully on port ${serverPort}`);
});

socketServer.listen(socketPort, () => {
    console.log(`Connected successfully on port ${socketPort}`);
});

io.on('connection', (socket) => {
    console.log('a user connected');
  });
