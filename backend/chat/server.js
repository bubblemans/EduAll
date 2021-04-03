const WebSocket = require('ws');

const { queryMessages, insertMessage } = require('./mongo');

const wss = new WebSocket.Server({ port: 3030});

wss.on('connection', ws => {
  queryMessages()
  .then(messages => {
    ws.send(JSON.stringify(messages));
  })
  .catch(err => console.log(err.stack));

  ws.on('message', data => {
    const message = JSON.parse(data);
    insertMessage(message[0])
    .then(
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      })
    )
  })
})