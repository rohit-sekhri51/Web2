import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

// Chat app HTTP server express is responsible for handling all the previous group chat when a user login.
// After that a websocket server will be used to handle the real-time chat.


app.get('/', (req, res) => {
  res.send('Hello Express !');
});

app.post('/api/signin', (req, res) => {    

    res.send('Hello Turbo Repo !');
 });


app.post('/api/signup', (req, res) => {    

  res.send('Hello Turbo Repo !');
});


app.post('/api/chat', (req, res) => {    

  res.send('Hello Turbo Repo !');
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});