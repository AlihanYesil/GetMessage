const {createServer} = require("http");
const {Server} = require("socket.io");




const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
      }
});

let users = [];
let messages = [];

io.on('connection', socket => {

  socket.on('new_user', (gelenveri) => {
    let hasUser = [];
    hasUser = users.filter(user => user.id == gelenveri.id);
    if(hasUser.length == 0){
      pushUser(gelenveri);
    }
    console.log(users);
    
    io.emit('users', users);
    io.emit('messages', messages);
  });


  socket.on('new_message', (message) => {
    messages.push( {key:message.id,mesaj:message.message});
    io.emit('messages', messages);
  });
  socket.on('cikis', (id) => {
    const index = users.indexOf(id);
    users.splice(index, 1);
    io.emit('users', users);
  });    

});
const pushUser = function(gelenveri){
  users.push({
    id: gelenveri.id,
    name:gelenveri.name
  });
}
httpServer.listen(3000);