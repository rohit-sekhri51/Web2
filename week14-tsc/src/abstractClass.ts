abstract class Shape {
    abstract name: string;
  
    abstract calculateArea(): number;
  
    describe(): void {
      console.log(`This shape is a ${this.name} with an area of ${this.calculateArea()} units squared.`);
    }
}

class Rectangle extends Shape {
    name: string;
    nick: string;

    constructor(public width: number, public height: number, n: string, ni: string) {
      super();
      this.name = n;
      this.nick = ni;
      this.height = height;
      this.width = width;
    }
  
    // Implement the abstract method
    calculateArea(): number {
      return this.width * this.height;
    }
  }
  
  // Another subclass implementing the abstract class
  class Circle extends Shape {
    name: string;
    nick: string;
  
    constructor(public radius: number, n: string, ni: string) {
      super();
      this.name = n;
      this.nick = ni;
      this.radius = radius;
    }
  
    // Implement the abstract method
    calculateArea(): number {
      return Math.PI * this.radius * this.radius;
    }
  }

const r1 = new Rectangle(3,5,"Rectangle","rect");

const c1 = new Circle(4,"Circle","cir");


console.log("Rect: " + r1.calculateArea());
console.log("Rect: " + r1.name + r1.height + r1.width);
r1.describe();

console.log("Cir: " + c1.calculateArea());
console.log("Cir: " + c1.name + c1.radius); 
c1.describe();