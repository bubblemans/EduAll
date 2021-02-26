const WebSocket = require('ws');
const mongo = require('mongodb');

const wss = new WebSocket.Server({ port: 3030});

wss.on('connection', ws => {
  ws.on('message', data => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})