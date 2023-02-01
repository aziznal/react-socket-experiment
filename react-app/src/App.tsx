import React, { useState } from 'react';
import { Subscription } from 'rxjs';
import { ServerConnection } from './socket-connection';

function App() {
  const server = ServerConnection;
  const [updatesSub, setUpdatesSub] = useState<Subscription>();

  const connect = async () => {
    resetUpdatesSub();

    await server.connect();

    const sub = server.updates.subscribe((update) => { console.log(update) })

    setUpdatesSub(sub);
  }

  const disconnect = () => {
    resetUpdatesSub();

    server.disconnect();
  }

  const resetUpdatesSub = () => {
    updatesSub?.unsubscribe();

    setUpdatesSub(undefined);
  }

  const sayHi = () => {
    console.log("telling server it's awesome too...");

    server.sayHi();
  }

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
        Socket connected: <>{server.isConnected ? '✅' : '❌'}</>
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
