const {createServer} = require("http");
const { join } = require("path");
const {Server, Socket} = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
      }
});




let users = [];
let messages = [];
let hasUser = [];

io.on('connection', socket => {
 let SOCKETID = socket.id

  socket.on('new_user', (gelenveri) => {

    hasUser = users.filter(user => user.id == gelenveri.id);
    if(hasUser.length == 0){

      gelenveri.socketId=SOCKETID;
      pushUser(gelenveri);
    }
    io.emit('users', users);
  });
  
  socket.on("room",(room)=>{
    io.emit('users', users);
    socket.leaveAll();
    socket.join(socket.id);
    
    
  });

  socket.on('new_message', (message) => {
    messages.push({key:message.id,mesaj:message.message,time:message.time,room:message.room,gndrnSocketId:socket.id});
    console.log('mesaj bu room a gitti :' + message.room);

    let mesaj=messages.filter(messager => messager.room == message.room && messager.gndrnSocketId==socket.id || messager.room == socket.id && messager.gndrnSocketId==message.room); 
    //ROOM DEĞİŞTİĞİNDE DEĞİŞMESİ LAZIM
    console.log(mesaj);

    io.to([message.room,socket.id]).emit('messages',mesaj);

    
  });

  
 

  socket.on('cikis', (id) => {
    users = users.filter(user => user.id = id)
    io.emit('users', users);
  });    

});
let pushUser = function(gelenveri){
  users.push({
    id: gelenveri.id,
    name:gelenveri.name,
    surname:gelenveri.surname,
    socketId:gelenveri.socketId,
  });

}

httpServer.listen(3000);