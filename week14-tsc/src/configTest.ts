const greet = (name: String) => `Hello, ${name} . Welcome !!!`

interface Address {
    house: string | number,
    city?: string,
    state: string,
    pincode: number
}

interface UserZ {
    name: string,
    nick: string,
    address: Address
}

interface Office {
    company: string,
    address: Address
}

let z1: UserZ = {
    name: "Govind",
    nick: "GNT",
    address: {
        house: 686,
        state: "harayana",
        pincode: 133001
    }
}

let o1: Office = {
    company: "Sunlife",
    address: {
        house: "dlf",
        city: "gurgaon",
        state: "up",
        pincode: 144001
    }
}