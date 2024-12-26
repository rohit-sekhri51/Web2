import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
     await prisma.userp.create({
        data: {
            username,
            password,
            firstName,
            lastName,
            todo: {
                create: {
                title: "First todo", 
                desc: "Description",
                tid: 11,
                done: true
                }
            }
        }
    });
}

insertUser("rs","p@ssw@rd","R@h1t","Sekhr1");