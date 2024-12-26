interface Person {
    name: string;
    age: number;
    greet(phrase: string): void;
}

class Employee implements Person {
    name: string;
    age: number;
    nick: string;

    constructor(n: string, a: number,ni: string) {
        // super();         // used in extend
        this.name = n;
        this.age = a;
        this.nick = ni;
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    }

    greeting(s: string) {
        console.log("Hello" + s + this.age);
    } 
}

const p1 = {
    name: "Vikas",
    age: 25    
}

const e1 = new Employee("Rohit",22,"Sekhri");
const e2 = new Employee("Vijay",39,"Sharma");

// console.log("log: "+ e1.greet("GNT"));
console.log(`Greet: ${e1.greet("Govind")}`);
console.log(`Greet: ${e2.greeting("Jajman")}`);
console.log("Employee E1: "+ e1.name + e1 .nick);
console.log("Person P1: "+ p1.name + p1.age);   // p1.greet("Welcome") is defined, just declared
console.log("Employee E2: "+ e2.name + e2.nick);

/*
let e1 :Employee = {
    name: "Rohit",
    age: 22,
    greet(g1)     
}*/

///////////////////////////////////////////////////////////////////////////////////////////////////

interface User {
    firstName: string;
	lastName: string;
	email: string;
	age: number;
}

function inLegal(user: User) :boolean {
    return (user.age>18 ? true : false)
}

let u1: User = {
    firstName: "Govind",
	lastName: "Thakur",
	email: "gnt@gmail.com",
	age: 37
}

// let a: number = u1.age;

let legal = inLegal(u1);
console.log("Legal:"+ legal);
