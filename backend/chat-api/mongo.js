const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chat', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
const contactSchema = new mongoose.Schema({
  user_id: String,
  contacts: [String]
});
var Contact = mongoose.model('contactModel', contactSchema, 'contact');

async function getContact(id) {
  const doc = await Contact.find({'user_id': id});
  return doc[0].contacts;
}

async function createContact(id, contacts) {
  const doc = {
    'user_id': id,
    'contacts': contacts
  };
  const res = await Contact.create(doc);
  return res;
}

async function createAllContacts(contacts) {
  var res = null;
  for (const i in contacts) {
    const doc = {
      'user_id': contacts[i],
      'contacts': contacts
    };
    res = await Contact.create(doc);
  }
  return res;
}

async function addContacts(contacts, additionals) {
  var res = null;
  for (const i in contacts) {
    res = await Contact.updateOne(
      {'user_id': contacts[i]},
      {$push: {'contacts': {$each: additionals}}},
      {upsert: true}
    )
  }
  return res;
}

async function updateContact(id, contacts) {
  const res = await Contact.updateOne(
    {'user_id': id},
    {"contacts": contacts}
  );
  return res;
}

const roomSchema = new mongoose.Schema({
  'room_id': String,
  'name': String,
  'participants': [String],
  'password': String,
  'updated_at': Date
});
var Room = mongoose.model('roomModel', roomSchema, 'room');

async function getRooms(user_id) {
  const docs = await Room.find({'participants': user_id});
  return docs;
}

async function getRoom(user_id, room_id) {
  const doc = await Room.findOne({'participants': user_id, 'room_id': room_id});
  return doc;
}

async function createRoom(user_id, data) {
  const res = await Room.create(data);
  return res;
}

async function updateRoom(room_id, data) {
  const res = await Room.updateOne({'room_id': room_id}, data);
  return res;
}

module.exports = {
  getContact,
  createContact,
  createAllContacts,
  updateContact,
  addContacts,
  getRooms,
  getRoom,
  createRoom,
  updateRoom
}