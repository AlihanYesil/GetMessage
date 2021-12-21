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
  socket.on('new_user', (name) => {
    users.push({
      id: socket.id,
      name
    });
    io.emit('users', users);
    io.emit('messages', messages);
  });
  socket.on('new_message', (message) => {
    messages.push("<b>" + message.name + ":</b> " + message.message);
    io.emit('messages', messages);
  });
  socket.on('disconnect', () => {
    const index = users.indexOf(socket.id);
    users.splice(index, 1);
    io.emit('users', users);
  });

});
httpServer.listen(3000);