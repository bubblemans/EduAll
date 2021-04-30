const redis = require('redis');

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis connected.');
})

async function updateRecentMessage(data) {
  const hkey = data['sender'];
  client.hget(hkey, 'number_of_rooms', (err, res) => {
    if (err) {
      console.log(err);
      throw err;
    }

    if (res === null) {
      initializeHash(hkey, data);
    } else {
      addToHash(hkey, data, res);
    }
  })
}

function initializeHash(hkey, data) {
  client.hset(hkey, 'number_of_rooms', '1', redis.print);

  for (var key in data) {
    if (key.includes('sender')) {
      continue;
    }
    const value = data[key];
    key = key + '_1';
    client.hset(hkey, key, value, redis.print);
  }
}

function addToHash(hkey, data, number_of_rooms) {
  isRoomExist(hkey, data, number_of_rooms).then((bools) => {
    console.log('bools is ' + bools);

    if (bools.includes(true)) {
      for (var key in data) {
        if (key.includes('sender')) {
          continue;
        }
        const value = data[key];
        key = key + '_' + data['sender'];
        client.hset(hkey, key, value, redis.print);
      }
    } else {
      number_of_rooms = (parseInt(number_of_rooms) + 1).toString();
      client.hset(hkey, 'number_of_rooms', number_of_rooms, redis.print);

      for (var key in data) {
        if (key.includes('sender')) {
          continue;
        }
        const value = data[key];
        key = key + '_' + number_of_rooms;
        client.hset(hkey, key, value, redis.print);
      }
    }
  })
}

function isRoomExist(hkey, data, number_of_rooms) {
  const newRoom = data['room_id'];
  const keys = [1, 2, 3];
  const rooms = keys.map(key => 'room_id_' + key.toString());
  const promiseAll = Promise.all(rooms.map( room => {
    return compareRoom(newRoom, hkey, room);
  }));
  return promiseAll;
}

function compareRoom(newRoom, hkey, key) {
  return new Promise((resolve, reject) => {
    client.hget(hkey, key, (err, oldRoom) => {
      if (newRoom === oldRoom) {
        setTimeout(() => {
          resolve(true);
        })
      } else {
        setTimeout(() => {
          resolve(false);
        })
      }
    });
  })
}

module.exports = {
  updateRecentMessage
}