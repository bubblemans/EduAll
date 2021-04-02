const redis = require('redis');

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis connected.');
})

async function updateRecentMessage(data) {
  client.get('number_of_rooms', (err, res) => {
    if (err) {
      console.log(err);
      throw err;
    }

    if (res === null) {
      client.set('number_of_rooms', '1', redis.print);
      for (var key in data) {
        const value = data[key];
        key = key + '_1';
        client.set(key, value, redis.print);
      }
    } else {
      const number_of_rooms = (parseInt(res) + 1).toString();
      client.set('number_of_rooms', number_of_rooms, redis.print);
      for (var key in data) {
        const value = data[key];
        key = key + '_' + number_of_rooms;
        client.set(key, value, redis.print);
      }
    }
  })
}

module.exports = {
  updateRecentMessage
}