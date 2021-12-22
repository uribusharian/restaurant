const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//get username and room from URL
const {username, room } = Qs.parse(location.search,{
    ignoreQueryPrefix: true
  
});



const socket = io();

// join the chat

socket.emit('joinRoom',{username,room});

//listen to users and room info

socket.on('roomUsers', ({room,users})=>{
    outputRoomName(room);
    outputUsers(users);
} );

// listen to message from aerver
socket.on('message', (message) =>{
    console.log(message)
    outputMessage(message);
    
    
    //scroll down when we get message
chatMessages.scrollTop = chatMessages.scrollHeight;
});




//message submmition

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

//get message value
    const msg = e.target.elements.msg.value
//emit message to server
    socket.emit('chatMessage', msg);

// clear the input and focus on the input form
e.target.elements.msg.value='';
e.target.elements.msg.focus();


});

//output message to DOM

function outputMessage (message) {

    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML =`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);

};

//add room name the the DOM

function outputRoomName (room){ 
    roomName.innerText = room
}

// add user to the DOM

function outputUsers (users){
    userList.innerHTML = `${users.map(user =>`<li>${user.username}</li>`).join('')}`;
}