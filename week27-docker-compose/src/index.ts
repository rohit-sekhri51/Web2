import { PrismaClient } from '@prisma/client';
import express from 'express';

const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.get('/',async (req, res) => {

    const data1 = await prisma.user.findMany();
    console.log(data1); 

    res.status(200).json({ data1 });
    // res.send('Get endpoint. Greetings from Express');

});

app.post('/api', async (req, res) => {  
    
    await prisma.user.create({
        data: {
            email: 'gnt@gmail.com',
            name: 'Govind',
            posts: {
                create: { title: 'Hello Govind' },
            },
        },
    });
  // res.send('POST request to the homepage');
  res.status(200).json({ message: 'New User created' }); 

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });