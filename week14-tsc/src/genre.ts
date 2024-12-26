function getFirstElement(arr: (string | number)[]) {
    return arr[0];
}

const el = getFirstElement(["Vikas", 2, "gnt"]);
console.log(el.toLocaleString);

function identify<T>(arg: T):T {
    return arg;
}

let output1 = identify<string>("Rohit");
let output2 = identify<number>(2);
console.log(output1+output2);

function get1Element<T>(arr: T[]) {
    return arr[0];
}

const elnew = get1Element<string>(["Vikas", "gnt"]);
console.log(elnew.toLowerCase());
const elold = get1Element<number>([4,6,8]);
console.log(elold.toExponential(0.2));