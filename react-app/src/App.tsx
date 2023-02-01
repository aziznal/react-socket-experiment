import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { connectToSocket, disconnectFromSocket } from './socket-connection';

function App() {
  const [socket, setSocket] = useState<Socket | null>();

  const connect = () => {
    // if already connected
    if (socket !== null && socket !== undefined) return;

    console.log("connected!");

    setSocket(connectToSocket());
  }

  const disconnect = () => {
    if (socket === null || socket === undefined) return;

    console.log("disconnected!");

    disconnectFromSocket(socket);

    setSocket(null);
  }

  const sayHi = () => {
    if (socket === null || socket === undefined) return;

    console.log("telling server it's awesome too...");

    socket.emit(`Hi Server. You're awesome too!!`);
  }

  useEffect(() => {
    if (socket === null || socket === undefined) return;

    socket.onAny((something) => {
      console.log(`Socket says: ${something}`)
    });

    return () => {socket.removeAllListeners()};
  }, [socket])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
      height: '100vh',
      width: '100vw',
    }}>
      <div>
        Socket connected: <>{(socket !== null) ? 'true' : 'false'}</>
      </div>

      <button onClick={ connect }>
        Connect to socket
      </button>

      <button onClick={ sayHi }>
        Say Hi!
      </button>

      <button onClick={ disconnect }>
        Disconnect from socket
      </button>

      <h3>Check your console! (F12)</h3>
    </div>
  );
}

export default App;
