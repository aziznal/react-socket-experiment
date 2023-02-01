import express from "express";
import http from 'http';
import { Server } from 'socket.io';

import cors from 'cors';

const serverPort = 4000;
const socketPort = 4001;

const app = express();

app.use(cors({ origin: true }));
app.use((req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const socketServer = http.createServer(app);
const io = new Server(socketServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'OPTIONS']
    }
});

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

    const interval = setInterval(() => {
        socket.emit('You are awesome!');
        console.log("telling user they're awesome")
    }, 1000)

    socket.on("disconnect", (reason) => {
        console.log(`Socket disconnected. Reason: ${reason}`);
        clearInterval(interval);
    })
  });
