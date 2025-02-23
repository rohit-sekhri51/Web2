import { prisma } from "db/client";

Bun.serve({
    port: 8081,
    fetch(req, server) {        // handle incoming requests
      // upgrade the request to a WebSocket
      if (server.upgrade(req)) {
        return; // do not return a Response
      }
      return new Response("Upgrade failed", { status: 500 });   
    },
    websocket: {
        message(ws, message) {
            prisma.user.create({
                data: {
                    username: Math.random().toString(),
                    password: Math.random().toString()
                }
            })
            ws.send(message);
        },
    },
});