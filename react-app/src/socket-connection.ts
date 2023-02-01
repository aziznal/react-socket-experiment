import socketIO, { Socket } from "socket.io-client";

export function connectToSocket(): Socket {
    return socketIO('http://localhost:4001');
}

export function disconnectFromSocket(socket: Socket) {
    socket.disconnect();
}
