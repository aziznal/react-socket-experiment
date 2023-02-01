import { Observable, Subject } from "rxjs";
import socketIO, { Socket } from "socket.io-client";

export class ServerConnection {
    static get updates(): Observable<string> {
        return this.#updates;
    }

    static get isConnected(): boolean {
        return this.#socket !== undefined && this.#socket.connected;
    }
    
    static #updates = new Subject<string>();
    static #socket: Socket | undefined;

    static async connect(): Promise<void> {
        if (this.isConnected) return this.disconnect();

        this.#socket = socketIO('http://localhost:4001');

        await new Promise<void>((resolve) => {
            this.#socket?.on('connect', () => { resolve(); console.log("connected to socket") });
        })

        this.#listenToSocketEmissions();
    }

    static disconnect() {
        if (!this.isConnected) return;

        console.log("disconnected from socket");

        this.#socket!.disconnect();

        this.#socket!.removeAllListeners();

        this.#socket = undefined;
    }

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
