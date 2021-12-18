const express = require ('express');
const path = require ('path');
const http = require ('http');
const socketio = require('socket.io');
const { Console } = require('console');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, ('public'))));

//run every time a client connects
io.on('connection', (socket) => {
   
    socket.emit('message', 'welcome to the chat!');

    // when  user connects emit to other users

    socket.broadcast.emit('message', 'A user has joined the chat');

    // when user disconnects emit to other users 
    socket.on('disconnect', () =>{
        socket.broadcast.emit('message', 'A user has left the chat' );
    });
    
    //catch the chat messages
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg );
    });
    

});


const PORT = 3000 || process.env.PORT

server.listen(PORT ,()=>{console.log(`server is listening on port - ${PORT}`) });