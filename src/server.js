
const express = require("express");
const http = require("http");
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Track the number of users
let userCount = 0;

io.on('connection', (socket) => {
    console.log('connected');

    // Hnadle assign role.
    // The first user who opens the code block page is the mentor
    userCount++;
    const role = userCount === 1 ? 'mentor' : 'student';
    console.log(`Role assigned: ${role}`); // Debugging
    socket.emit('assign-role', role);

    // Handle code change
    socket.on('code-change', (code) => {
        console.log(`Code change received: ${code}`); // Debugging
        if (role === 'student') {
            //Broadcast the changed code to the mentor
            socket.broadcast.emit('code-change', code);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        userCount = Math.max(0, userCount - 1);
    })
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});