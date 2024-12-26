interface UserY {
	firstName: string;
	lastName: string;
	age: number;
}

const u1y: UserY = {
    firstName: "Rohit",
	lastName: "Sekhri",
	age: 36,
}
const u2y: UserY = {
    firstName: "Gopal",
	lastName: "Dudeja",
	age: 42,
}
const u0y: UserY = {
    firstName: "Vikas",
	lastName: "Khatri",
	age: 15,
}

let arrLegal: UserY[] = [u0y,u1y,u2y];

function outLegal(u: UserY[]) {    
    return u.filter(x => x.age >=18);
}

let filterLegal = outLegal(arrLegal);

console.log("Filtered Legal Users: " + JSON.stringify(filterLegal) );
filterLegal.forEach((x) => {
    console.log("Name " + x.firstName + x.lastName + x.age);
})


//////////////////////////////////////////////////////////////

let arr: number[] = [3,5,1,96666,16,33,22];
let stri: string[] = ["Rohit","Govind","Vikas"];

let num: Array<number> = [11,22,333,55,6];

function maxValue(arr: number[]) : number{
    let max=0;
    for(let i=0; i<arr.length; i++) {
        if(arr[i] > max){
            max = arr[i];
        }
    }
    return max;
}

console.log("Max Value is: "+ maxValue(arr));
console.log("Max Value is: "+ maxValue(num));