// https://app.swaggerhub.com/apis/bubblemans/chat/1.0.0#/
// GET contacts for chat page to choose who to talk to
// CREATE contacts for registration page => course service (students choose instructor) => create contacts for users that are in the same course
// PUT contacts <= more people enroll in a course or use email to add to contact

// GET room when user click the room on the left, return the room info first, and return message later
// POST room for chat page to create a room after choosing who to talk to and sending the 1st message (no history message)
// PUT room for people to join the room/change room's name/change room's password

// GET message/room_id -> no need, use websocket
// POST message/room_id -> no need, use websocket but need to add a function for redis
// PUT message/room_id -> no need for now
// DELETE message/room_id -> no need for now

// GET recentMessages return redis data

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { getContact, createContacts, updateContacts } = require('./mongo');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/contact/:token', (req, res) => {
  const token = req.params.token;
  // const user_id = getUserId(token);
  const user_id = token;
  getContact(user_id).then(contact => {
    res.json(contact);
  });
})

app.post('/contact/:token', (req, res) => {
  const token = req.params.token;
  // const user_id = getUserId(token);
  const user_id = token;
  const contacts = req.body.contacts;
  createContacts(user_id, contacts).then(
    res.sendStatus(201)
  );
})

app.put('/contact/:token', (req, res) => {
  const token = req.params.token;
  // const user_id = getUserId(token);
  const user_id = token;
  const contacts = req.body.contacts;
  updateContacts(user_id, contacts).then(
    res.sendStatus(200)
  );
})

app.get('/room/:token', (req, res) => {
  const token = req.params.token;
  // const user_id = getUserId(token);
  const room_id = req.query.id | null;
  if (room_id === 0) {
    // const rooms = getRooms(user_id);
    const rooms = {
      'rooms': [
        {
          'id': 'user_id_1',
          'name': 'myroom',
          'participants': [
            'user_id_1',
            'user_id_2'
          ],
          "password": "myroompassword"
        }
      ]
    }
    res.json(rooms);
  } else {
    // const room = getRoom(user_id, room_id);
    const room = {
      'id': 'user_id_1',
      'name': 'myroom',
      'participants': [
        'user_id_1',
        'user_id_2'
      ],
      "password": "myroompassword"
    }
    res.json(room);
  }
})

app.post('/room/:token', (req, res) => {
  const token = req.params.token;
  // const user_id = getUserId(token);
  const data = req.body;
  console.log(data);
  // createRoom(user_id, data);
  res.sendStatus(201);
})

app.put('/room/:token', (req, res) => {
  const token = req.params.token;
  // const user_id = getUserId(token);
  const room_id = req.query.id | null;
  if (room_id === 0) {
    res.sendStatus(400);
  } else {
    const data = req.body;
    // updateRoom(room_id, data);
    res.sendStatus(200);
  }
})

app.listen(port, () => {
  console.log('run on localhost:3000')
})