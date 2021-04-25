const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { getContact, createContact, createAllContacts, addContacts, updateContact, getRooms, getRoom, createRoom, updateRoom } = require('./mongo');
const { getRecentMessages } = require('./redis');
const { getUserId } = require('./utils');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Errors');
})

app.get('/contact/:token', (req, res) => {
  const token = req.params.token;
  getUserId(token).then(userId => {
    getContact(userId).then(contact => {
      res.json(contact);
    });
  });
})

app.post('/contact/:token', (req, res) => {
  const token = req.params.token;
  // const user_id = getUserId(token);
  const user_id = token;
  const contacts = req.body.contacts;
  createContact(user_id, contacts).then(
    res.sendStatus(201)
  );
})

app.put('/contact/:token', (req, res) => {
  const token = req.params.token;
  // const user_id = getUserId(token);
  const user_id = token;
  const contacts = req.body.contacts;
  updateContact(user_id, contacts).then(
    res.sendStatus(200)
  );
})

app.post('/contacts/:token', (req, res) => {
  const token = req.params.token;
  getUserId(token).then(userId => {
    const additionals = req.body.additionals;
    createAllContacts(additionals).then(
      res.sendStatus(201)
    );
  });
})

app.put('/contacts/:token', (req, res) => {
  const token = req.params.token;
  getUserId(token).then(userId => {
    const contacts = req.body.contacts;
    console.log(req);
    console.log(req.body);
    const additionals = req.body.additionals;
    addContacts(contacts, additionals).then(
      res.sendStatus(200)
    );
  })
})

app.get('/room/:token', (req, res) => {
  const token = req.params.token;
  // const user_id = getUserId(token);
  const room_id = req.query.id;
  const user_id = token;
  if (room_id === undefined) {
    getRooms(user_id).then( rooms => {
      res.json(rooms);
    });
  } else {
    const room = getRoom(user_id, room_id).then( room => {
      if (room === null) {
        res.json({});
      } else {
        res.json(room);
      }
    });
  }
})

app.post('/room/:token', (req, res) => {
  const token = req.params.token;
  // const user_id = getUserId(token);
  const user_id = token;
  const data = req.body;
  if (data.updated_at === undefined) {
    data.updated_at = new Date().toISOString();
    createRoom(user_id, data).then(
      res.sendStatus(201)
    );
  } else {
    createRoom(user_id, data).then(
      res.sendStatus(201)
    );
  }
})

app.put('/room/:token', (req, res) => {
  const token = req.params.token;
  // const user_id = getUserId(token);
  const room_id = req.query.id;
  if (room_id === null) {
    res.sendStatus(400);
  } else {
    const data = req.body;
    updateRoom(room_id, data).then(res.sendStatus(200));
  }
})

app.get('/recentMessages/:token', (req, res) => {
  const token = req.params.token;
  getUserId(token).then(userId => {
    getRecentMessages(userId, data => {
      res.json(data);
    })
  });
})

app.listen(port, () => {
  console.log('run on localhost:4000')
})
