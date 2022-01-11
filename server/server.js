const {createServer} = require("http");
const { join } = require("path");
const {Server, Socket} = require("socket.io");
const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://192.168.137.232:8080",
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
      socket.join(gelenveri.id)
      gelenveri.socketId=SOCKETID;
      pushUser(gelenveri);
    }
    io.emit('users', users);
  });
  
  io.emit('users', users);

  socket.on("room",(room)=>{
    io.emit('users', users);
    socket.leaveAll();
    socket.join(room.gndrnId);

    io.to([room.aliciId,room.gndrnId]).emit('messages',messages);
    
  });

  socket.on('new_message', (message) => {
    messages.push({gndrnId:message.id,mesaj:message.message,time:message.time,room:message.room,gndrnSocketId:socket.id});
    console.log('mesaj bu room a gitti :' + message.room);

    io.to([message.room,message.id]).emit('messages',messages);
      
    

    
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

httpServer.listen(3000,"192.168.137.232");