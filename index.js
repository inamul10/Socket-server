const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

io.on('connection', socket => {
    console.log('A user connected');
    
    socket.on('draw', data => {
        // Broadcast the drawing data to all connected clients
        socket.broadcast.emit('draw', data);
        console.log("data recieved")
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
