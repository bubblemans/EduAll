const WebSocket = require('ws');
const mongoose = require('mongoose');

const wss = new WebSocket.Server({ port: 3030});
// const MongoClient = mongo.MongoClient;
const url = 'mongodb://localhost:27017/demo-chat';
const messageSchema = new mongoose.Schema({name: String, content: String});
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const Message = mongoose.model('messages', messageSchema);

async function queryMessages() {
  const messages = await Message.find();
  return messages;
}

async function insertMessage(message) {
  await Message.create(message)
}

wss.on('connection', ws => {
  queryMessages()
  .then(messages => {
    ws.send(JSON.stringify(messages));
  })
  .catch(err => console.log(err.stack));

  ws.on('message', data => {
    const message = JSON.parse(data);
    insertMessage(message)
    .then(
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      })
    )
  })
})