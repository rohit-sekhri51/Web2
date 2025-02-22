import { Bet, betNumber, GameState } from "./types";

export class GameManager {
    private _instance: GameManager;
    state: GameState = GameState.GameOver;
    bets: Bet[] = [];
    private lastWinner: Number = -1;    // betNumber.Zero;

    private constructor() {}

    public static getInstance() {
        if (!this._instance) {
            this._instance = new GameManager();
        }
        return this._instance;
    }

    public start() {
        console.log('Game started');
        this.state = GameState.CanBet;
    }

    public end(output: number) {
        console.log('Game ended');
        this.lastWinner = output;
        this.state = GameState.GameOver;
        this.bets.forEach(bet => {
            if (bet.number === output) {
                console.log(`User ${bet.id} won ${bet.amount * 36} coins`);
            }
            bet.amount = 0;
        });
    }

    // This method should be called when a user bets
    public bet(amount: number, betNumber: Number,id: number): boolean {
        console.log(`User ${id} bet ${amount} coins`);
        if (this.state === GameState.CanBet) {
            console.log('User can bet');
            this.bets.push({ id: id, amount: amount, number: betNumber });
            return true;
        }
        return false;
    }
}