import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
}

let userCount = 0;
let onMessCount = 0;

let allSockets: User[] = [];

wss.on("connection", (socket) => {
    userCount = userCount + 1;

    socket.on("message", (message) => {
        onMessCount = onMessCount + 1;
        
        // wss.clients.forEach(function each(client) {
        //     if(client.readyState === WebSocket.OPEN) {
        //         // client.send(message);
        //         console.log(  " Inside forEach ");
        //         // JSON.stringify(socket) +
        //     }
        // })

        const parsedMessage =   JSON.parse(message as unknown as string);

        if (parsedMessage.type == "join") {
            
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
            console.log( userCount + " user joined room " + allSockets.length);
        }

        if (parsedMessage.type == "chat") {
            console.log(onMessCount + " user wants to chat " + message);
            const currentUserRoom = allSockets.find((x) => x.socket == socket)?.room;
            // let currentUserRoom = null;
            // for (let i = 0; i < allSockets.length; i++) {
            //     if (allSockets[i].socket == socket) {
            //         currentUserRoom = allSockets[i].room
            //     }
            // }

            // allSockets.find((x) => x.room == currentUserRoom)?.socket.send(parsedMessage.payload.message);
            // for (let i = 0; i < allSockets.length; i++) {
            //     if (allSockets[i].room == currentUserRoom) {
            //        allSockets[i].socket.send(parsedMessage.payload.message)
            //     }
            // }
            //allSockets.forEach((x) => x.room == currentUserRoom).socket.send(parsedMessage.payload.message);
            allSockets.filter((x) => x.room === currentUserRoom).forEach((x) => x.socket.send(parsedMessage.payload.message));
        }

    })

})
