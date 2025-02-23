// Added below to Path: mono-cicd/week27/apps/backend/package.json
// "dependencies": {
// 	"db": "*"
// }


import { prisma } from "db/client";
import express from "express";

const app = express();
const port = 8080;
app.use(express.json());

app.get("/users", async (req, res) => {

  await prisma.user.findMany().then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    res.status(500).json({ error: err.message });
  });
  
});

app.post("/", async (req, res) => {
    const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  const user = await prisma.user.create({   
        data: {     
        username: username,
        password: password,
            },
        });
    res.json(user);
    });

app.listen(port, () => {    
  console.log(`Server listening at http://localhost:${port}`);
});
