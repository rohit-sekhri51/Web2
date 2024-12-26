type UserX = {
	firstName: string;
	lastName: string;
	age: number
}

// unions
type StringOrNumber = string | number;
// You can not do this using interfaces

function printId(id: StringOrNumber) {
  console.log(`ID: ${id}`);
}

printId(101); // ID: 101
printId("202"); // ID: 202

// Intersections

type EmployeeX = {
	name: string;
	startDate: Date;
  };
  
  type Manager = {
	name: string;
	department: string;
  };
  
  type TeamLead = EmployeeX & Manager;
  // You can not do this using interfaces
  
  const teamLead: TeamLead = {
	name: "Rohit",
	startDate: new Date(),
	department: "Software developer"
  };