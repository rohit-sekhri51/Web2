import { Client } from 'pg'
 
const client = new Client({
  host: 'ep-nameless-scene-a1w147sw.ap-southeast-1.aws.neon.tech',
  port: 5432,
  database: 'Todo',
  user: 'Todo_owner',
  password: 'SHIlPxwD0zr1',
  ssl: true,
});

async function Oraclepg() {
            
        await client.connect();  //"postgresql://Todo_owner:SHIlPxwD0zr1@ep-nameless-scene-a1w147sw.ap-southeast-1.aws.neon.tech/Todo?sslmode=require");
        console.log("Client established");

    const result = await client.query(`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`)
    
    const result1 = await client.query('SELECT * FROM playing_with_neon where id=$1;',[3]);

    console.log(result);
    console.log(result1); // untested
}

Oraclepg();


