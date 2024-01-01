
const express = require("express");
const http = require("http");
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('connected');

    // Handle code change
    socket.on('code-change', (code) => {
        //Broadcast the changed code to all other clients
        socket.broadcast.emit('code-change', code);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    })
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




