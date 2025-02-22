import WebSocket from 'ws';
import { OutMessage } from './types';
import { User } from './User';

let ID = 1;



export class UserManager {
    private users: User[] = [];
    private _instance: UserManager;

    private constructor() {}

    public static getInstance() {
        if (!this._instance) {
            this._instance = new UserManager();
        }
        return this._instance;
    }

    addUser(ws: WebSocket, name: string) {
        const id = this.users.length + 1;
        this.users.push(new User(id, name, ws));
        
        ws.on('close', () => this.removeUser(id));

        return id;
    }

    removeUser(id: number) {
        this.users = this.users.filter(user => user.id !== id);
    }

    getUserById(id: number) {
        return this.users.find(user => user.id === id);
    }

    getUsers() {
        return this.users;
    }
    
    /* Broadcast a message to all users who has joined except the one with the given ID 
        * (or to all users if excludeId is not provided).
    */
    broadcast(message: OutMessage, excludeId?: number) {
        this.users.forEach(({ws,id}) => {
            if (id !== excludeId) {
                ws.send(JSON.stringify(message));
        }});
    }
}

