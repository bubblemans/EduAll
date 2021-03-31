const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chat', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const contactSchema = new mongoose.Schema({
  user_id: String,
  contacts: [String]
});

var Contact = mongoose.model('Model', contactSchema, 'contact');

async function getContact(id) {
  const doc = await Contact.find({'user_id': id});
  return doc[0].contacts;
}

async function createContacts(id, contacts) {
  const doc = {
    'user_id': id,
    'contacts': contacts
  };
  const res = await Contact.create(doc);
  return res;
}

async function updateContacts(id, contacts) {
  const res = await Contact.updateOne(
    {'user_id': id},
    {"contacts": contacts}
  );
  return res;
}

module.exports = {
  getContact,
  createContacts,
  updateContacts
}