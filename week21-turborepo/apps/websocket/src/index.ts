import { WebSocket } from  'ws';
import { UserManager } from './UserManager';

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws, request) {
    // You can get the query parameters from the request URL like this:
    // const url = new URL(request.url, 'http://localhost:8080');
    const url = request.url;

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const name = queryParams.get('name');
    UserManager.getInstance().addUser(ws, name);

  ws.on('error', console.error); 

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});