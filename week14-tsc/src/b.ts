function greetSum(name :string,x: number,y: number) :number {
    console.log("Hello " + name);
    return (x+y);
}

const s:number = greetSum("rohit",5,2);
console.log("Sum is: "+ s);

function isLegal(age: number) :boolean{
    return (age>18 ? true : false)
}

console.log(isLegal(2));




function delay(xy: () =>number) {
    
    setTimeout(() => {
        const result = xy();
        console.log("Inside TimeOut: "+ result);
    },2000);
    console.log("After TimeOut "+ xy);
}

function multiply(a: number,b: number) :number {
    console.log("Welcome! " + (a*b));
    return a*b;
}

// delay(() => multipy(2,5));

const multiplyWrapper = () => multiply(2, 5);
const mul = delay(multiplyWrapper);

console.log("End "+ multiplyWrapper);