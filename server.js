const express = require ('express');
const path = require ('path');
const http = require ('http');
const socketio = require('socket.io');
const { Console } = require('console');
const formatMessage = require('./services/messages');
const { userJoin, getCurrentUser,userLeave,getRoomUsers } = require('./services/users');
const router = express.Router();

require('dotenv').config();

const app = express();

const route = require('./routes/router.js')
app.use('/',route )

const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'views')));
console.log(path.join(__dirname, 'views'))
const botName = 'chatBot'

//run every time a client connects
io.on('connection', (socket) => {
    socket.on('joinRoom',({username,room}) =>{
        const user = userJoin(socket.id,username,room);
        socket.join(user.room);

        socket.emit('message', formatMessage(botName,'welcome to the chat!'));
    
        // when  user connects emit to other users
    
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`)
        );
        
        //users and room info
        
        io.to(user.room).emit('roomUsers',{
                room:user.room,
                users:getRoomUsers(user.room)

            });
            //catch the chat messages
            socket.on('chatMessage', (msg) => {
                const user = getCurrentUser(socket.id);
                io.to(user.room).emit('message', formatMessage(user.username, msg ));
            });
    });

 
    
     // when user disconnects emit to other users 
       socket.on('disconnect', () =>{
            const user = userLeave(socket.id);

            if(user){
                io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat` ));

            }

    });
    

});



const PORT = 3000 || process.env.PORT

server.listen(PORT ,()=>{console.log(`server is listening on port - ${PORT}`) });