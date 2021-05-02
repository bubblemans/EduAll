const { queryMessages, insertMessage } = require("./mongo");

const app = require("express")();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


io.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on("disconnect", () =>
     console.log(`Disconnected: ${socket.id}`));

  socket.on("join", (room_id) => {
     console.log(`Socket ${socket.id} joining ${room_id}`);
     queryMessages(room_id)
      .then(messages => {
        io.to(room_id).emit("chat", messages);
      })
     socket.join(room_id);
  });

  socket.on("chat", (data) => {
     const { room_id, sender, message, name } = data;
     insertMessage(data)
      .then( () => {
        console.log(`${name} sent ${message} in ${room_id}`);
        io.to(room_id).emit("chat", [data]);
      })
  });
});

server.listen(3030);
