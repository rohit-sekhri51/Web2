export class Game {
    private _instance: Game;
    private constructor() {}
    public static getInstance() {
        if (!this._instance) {
            this._instance = new Game();
        }
        return this._instance;
    }
    start() {
        console.log('Game started');
    }
}