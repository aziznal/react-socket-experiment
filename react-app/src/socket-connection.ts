import { Observable, Subject } from "rxjs";
import socketIO, { Socket } from "socket.io-client";

/**
 * Manages connections to the server, including opening and closing them, and
 * saying hi to ther server
 */
export class ServerConnection {
    /**
     * Updates incoming from the server
     */
    static get updates(): Observable<string> {
        return this.#updates;
    }

    /**
     * Whether the connection to the server is currently open
     */
    static get isConnected(): boolean {
        return this.#socket !== undefined && this.#socket.connected;
    }
    
    static #updates = new Subject<string>();
    static #socket: Socket | undefined;

    /**
     * Opens a new connection to the server.
     *
     * If a connection already exists, then it's closed first then a new
     * connection is created.
    */
    static async connect(): Promise<void> {
        if (this.isConnected) this.disconnect();

        this.#socket = socketIO('http://localhost:4001');

        await new Promise<void>((resolve) => {
            this.#socket?.on('connect', () => { resolve(); console.log("connected to socket") });
        })

        this.#listenToSocketEmissions();
    }

    /**
     * Closed the current active connection if it exists and is actually active.
    */
    static disconnect(): void {
        if (!this.isConnected) return;

        this.#socket?.disconnect();
        
        this.#socket?.removeAllListeners();
        
        console.log("disconnected from socket");
    }

    /**
     * Greets the server to sooth its feelings of not being able to express itself visually.
     */
    static sayHi() {
        if (!this.isConnected) return;

        this.#socket!.emit(`Hello Server! You're awesome too!`);
    }

    static #listenToSocketEmissions() {
        if (!this.isConnected) return;

        this.#socket!.onAny((data) => {
            this.#updates.next(data);
        });
    }
}
