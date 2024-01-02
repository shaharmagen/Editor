
const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors()); // Use cors middleware for all routes
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      transports: ['websocket'] // ensure WebSocket is enabled
    }
  });

// Track the number of users
let userCount = 0;

io.on('connection', (socket) => {
    // Hnadle assign role.
    // The first user who opens the code block page is the mentor
    userCount++;
    const role = userCount === 1 ? 'mentor' : 'student';
    socket.emit('assign-role', role);

    // Handle code change
    socket.on('code-change', (code) => {
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