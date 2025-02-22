export type OutMessage = {
    type: 'bet',
    payload: {
        clientId: string,
        amount: string,
        balance: string,
        locked: string,
    }
} | {
    type: 'bet-undo',
    payload: {
        clientId: string,
        amount: string,
        balance: string,
        locked: string,
    }
};

export enum COINS { One, Five, Ten, TwentyFive, Fixty, OneHundred, TwoHundred, FiveHundred }


export enum betNumber { Zero, One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, 
    Eleven, Twelve, Thirteen, Fourteen, Fifteen, Sixteen, Seventeen, Eighteen, Nineteen, Twenty, 
    TwentyOne, TwentyTwo, TwentyThree, TwentyFour, TwentyFive, TwentySix, TwentySeven, TwentyEight, 
    TwentyNine, Thirty, ThirtyOne, ThirtyTwo, ThirtyThree, ThirtyFour, ThirtyFive, ThirtySix } 

export enum GameState { CanBet, CannotBet, GameOver }

export type Bet = {
    id: number;
    amount: number;
    number: number;
};