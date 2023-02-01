import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { connectToSocket, disconnectFromSocket } from './socket-connection';

function App() {
  const [socket, setSocket] = useState<Socket | null>();

  const connect = () => {
    console.log("connected!");

    setSocket(connectToSocket());
  }

  const disconnect = () => {
    if (socket === null || socket === undefined) return;

    console.log("disconnected!");

    disconnectFromSocket(socket);

    setSocket(null);
  }

  useEffect(() => {
    if (socket === null || socket === undefined) return;

    socket.onAny((something) => {
      console.log(`Socket says: ${something}`)
    });

    return () => {socket.removeAllListeners()};
  }, [socket])

  return (
    <div>
      <h1>Hello World!</h1>

      <div>
        <h3>Current socket</h3>
      </div>

      <hr></hr>

      <button onClick={ connect }>
        Connect to socket
      </button>

      <button onClick={ disconnect }>
        Disconnect from socket
      </button>
    </div>
  );
}

export default App;
