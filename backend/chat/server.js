// const WebSocket = require('ws');

// const { queryMessages, insertMessage } = require('./mongo');

// const wss = new WebSocket.Server({ port: 3030});

// wss.on('connection', ws => {
//   queryMessages()
//   .then(messages => {
//     ws.send(JSON.stringify(messages));
//   })
//   .catch(err => console.log(err.stack));

//   ws.on('message', data => {
//     const message = JSON.parse(data);
//     insertMessage(message[0])
//     .then(
//       wss.clients.forEach(client => {
//         if (client !== ws && client.readyState === WebSocket.OPEN) {
//           client.send(data);
//         }
//       })
//     )
//   })
// })

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on('disconnect', () =>
     console.log(`Disconnected: ${socket.id}`));

  socket.on('join', (room) => {
     console.log(`Socket ${socket.id} joining ${room}`);
     socket.join(room);
  });

  socket.on('chat', (data) => {
     const { room, sender, message, name } = data;
     console.log(`${name} sent ${message} in ${room}`);
     io.to(room).emit('chat', [data]);
  });
});

server.listen(3030);
