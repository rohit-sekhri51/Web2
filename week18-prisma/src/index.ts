import { PrismaClient } from "@prisma/client";
import express from "express";

import bcrypt from 'bcrypt'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { userProfileSchema } from "./zod";

// const prisma = new PrismaClient();
const prisma = new PrismaClient ({
    log: ['query', 'info', 'warn', 'error'],
  });
/*
  import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
  import { PrismaClient } from '@prisma/client';
  
  @Injectable()
  export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
      super({
        log: [
          {
            emit: 'event',
            level: 'query',
          },
        ],
      });
    }
  
    async onModuleInit(): Promise<void> {
      await this.$connect();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.$on('query', async (e) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.log(`${e.query} ${e.params}`);
      });
    }
  
    async enableShutdownHooks(app: INestApplication): Promise<void> {
      this.$on('beforeExit', async () => {
        await app.close();
      });
    }
  }  */

const app = express();
app.use(express.json());


app.post("/create/user",async (req,res) => {

    const {username, password, firstName, lastName} = req.body;
    try {
    const { success } = userProfileSchema.safeParse({username, password, firstName, lastName});

    if (!success) {
        // res.status(411).json({
        //   message: "Error IN inputs, Zod failure"
        // });
        console.log("Error IN inputs, Zod failure");
        // TODO Why this gets logged and still entry is created in DB successfully. 
      } 
    
    const hashpw = await bcrypt.hash(password,16);

    //async function insertUser(username: string, password: string, firstName: string, lastName: string) {
        const result = await prisma.userp.create({
            data: {
                username,
                password: hashpw,
                firstName,
                lastName
            }
        });
        console.log(result.uid + " Result is: " + result.password);
    //     return result;
    // }
    // const result = insertUser(username, password, firstName, lastName);

    res.json({
        message: result.firstName
    });
} catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        res.json({ message: "email already taken" });
      }
    }
    res.status(500).json({
        message: "Caugth finally"
    })
  }
});

app.post("/create/todo", (req,res) => {

    const {userId, title, description} = req.body;

    async function createTodo(userId: number, title: string, description: string) {
        const result = await prisma.todop.create({
            data: {
                title: title,
                desc: description,
                user_id: userId
            }
        });
        console.log("Created ToDo: " + result.desc);
        return result;
    };

    const result = createTodo(userId, title, description); 

    res.json({
        message: result
    });
});

app.get("/users", async (req,res) => {

    const users = await prisma.userp.findMany();

    res.json({
        message: users
    })

});

app.get("/todos/:uid",async (req,res) => {

    const uid = req.params.uid;

    const todos = await prisma.userp.findUnique({
        where: {
            uid: parseInt(uid)
        },
        select: {
            username: true,
            lastName: true,
            todo: true
        }
    })

    res.json({
        message: todos
    });
});

app.get("/details/:uid",async (req,res) => {

    const uid = parseInt(req.params.uid);

    //async function getTodosAndUserDetails(userId: number) {
        const result = await prisma.todop.findMany({
            select: {
                title: true,
                desc: true,
                done: true,
                tid: true,
                user: true
            },
            where: {
                user_id: uid,
                // user: {
                //     firstName: "Gobind"
                // }
            }
        });
        //console.log("Getting all todo for user: " + JSON.stringify(result));
        // result.forEach(x => {
        //     console.log(`User ${userId}'s all todo - TITLE: ${x.title} First Name: ${x.user.firstName} USER Name: ${x.user.username}`);
        // });
    //     return result;
    // }
    //const result = getTodosAndUserDetails(uid);

    res.json({
        message: result
    })

});

app.listen(3000);
console.log("Express Server in running at port 3000");


// async function updateUser(username: string, firstName: string, lastName: string) {
//     const result = await prisma.userp.update({
//         where: {
//             username
//         },
//         data: {
//             firstName,
//             lastName
//         }
//     });
//     console.log(result.username + " Update is: " + result.firstName);
// }

// async function getUser(username: string) {
//     const result = await prisma.userp.findUnique({
//         where: {
//             username: username
//         }
//     });
//     console.log(username + " Get user is: " + JSON.stringify(result));
// }

//insertUser("gp","poiuy","Gopal","Dudeja");
//updateUser("rht","Roohitt","Seekhrii");
//getUser("gnt"); 




// async function getTodos(userId: number, ) {
//     const result = await prisma.todop.findMany({
//         select: {
//             tid: true,
//             title: true,
//             desc: true
//         },
//         where: {
//             user_id: userId
//         } 
//     });
//     console.log("Getting all todo for user: " + JSON.stringify(result));
//     result.forEach(x => {
//         console.log(`User ${userId}'s all todo - TID: ${x.tid} TITLE: ${x.title} DESC: ${x.desc}`);
//     });
// }

// createTodo(2, "go to Bronze gym", "Do 250 pushups");
// createTodo(2, "Go to a trek", "Hampta Pass");
// createTodo(4, "Take a Yoga", "AOL AMP Kashmir");

//getTodos(2);

// async function getTodosAndUserDetails(userId: number, ) {
//     const result = await prisma.todop.findMany({
//         select: {
//             title: true,
//             user: true
//         },
//         where: {
//             user_id: userId,
//             user: {
//                 firstName: "Gobind"
//             }
//         }
//     });
//     //console.log("Getting all todo for user: " + JSON.stringify(result));
//     result.forEach(x => {
//         console.log(`User ${userId}'s all todo - TITLE: ${x.title} First Name: ${x.user.firstName} USER Name: ${x.user.username}`);
//     });
//     // console.log(result.map(x => x.user.firstName) + " User all todo is: " + result.forEach(x => {
//     //     console.log(`TITLE: ${x.title}`);
//     // }) );
//     const countTodo = await prisma.todop.groupBy({
//         where: {
//             title: {
//                 startsWith: "go" 
//             }
//         },
//         by: ['title'],
//         // orderBy: {
//         //     tid: true
//         // },
//         _count: {
//             user_id: true
//         }
//     }); 
//     countTodo.forEach(x => {
//         console.log(x.title + " Count is: " + x._count.user_id)
//     });

//     // const aggregations = await prisma.userp.aggregate({
//     // where: {
//     //     firstName: {
//     //     startsWith: "R"
//     //     }
//     // },
//     // orderBy: {
//     //     uid: "asc"
//     // }
//     // //take: 1
//     // });
//     // console.log("Aggre is: " + JSON.stringify(aggregations) );
// }    

//getTodosAndUserDetails(2);
