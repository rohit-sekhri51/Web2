import { WebSocket } from "ws";
import { COINS, OutMessage } from "./types";
import { GameManager } from "./GameManager";

export class User {
    id: number;
    name: string;
    balance: number;
    locked: number;
    ws: WebSocket;

    constructor(id: number, name: string, ws: WebSocket) {
        this.id = id;
        this.name = name;
        this.balance = 2500;
        this.ws = ws;
        this.locked = 0;
    }

    bet(clientId: string, amount: COINS, betNumber: Number) {
        this.balance -= amount;
        this.locked += amount;

        const respone = GameManager.getInstance().bet(amount, betNumber, this.id);
        if (!respone) {
        this.ws.send(`You bet ${amount} coins. Your balance is now ${this.balance}`);
        this.ws.send(JSON.stringify({
            type: 'bet',
            payload: {
                clientId: clientId,
                amount,
                balance: this.balance,
                locked: this.locked,
            },
        }));
        } else {
            this.ws.send('You cannot bet at this time');    
            this.ws.send(JSON.stringify({
                type: 'bet-undo',
                payload: {
                    clientId: clientId,
                    amount,
                    balance: this.balance,
                    locked: this.locked,
                },
            }));
        }
    }

    send(payload: OutMessage) {
        this.ws.send(JSON.stringify(payload));
    }
}