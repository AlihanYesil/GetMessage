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

    /* socket.join(room);
    console.log('user bağlandı :'+ room);

    socket.on("roomleave",(bosroom)=>{
      socket.leave(room)
      console.log('odadan çıktı :'+room);
    }); */

    socket.on('new_message', (message) => {
      messages.push({key:message.id,mesaj:message.message,time:message.time,room:message.room});
      console.log('mesaj bu room a gitti :' + room);
      io.to([room,socket.id]).emit('messages',messages);

      socket.on("roomleave",(id)=>{
        socket.leave([id,message.room,socket.id]);
        console.log("odadan çıkış yapıtı:" + message.room );
      });
      
    });


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