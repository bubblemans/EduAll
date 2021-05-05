const redis = require("redis");
const fetch = require("node-fetch");

const client = redis.createClient();

client.on("connect", () => {
  console.log("Redis connected.");
})

async function updateAllParticipants(data) {
  const roomId = data.room_id;
  const token = data.token;
  console.log(data);
  return getAllParticipants(token, roomId)
   .then(participants => {
    participants.forEach(paricipant => {
      let to_be_updated = data;
      to_be_updated.sender = paricipant;  // TODO: sender is actually redis hash set owner, and should be renamed
      updateRecentMessage(to_be_updated);
    });
   })
}

async function getAllParticipants(token, roomId) {
  const url = "http://localhost:4000/room/" + token + "?id=" + roomId;
  const participants = await fetch(url)
    .then(res => res.json())
    .then(data => {
      return data.participants;
    })
  return participants;
}

async function updateRecentMessage(data) {
  const hkey = data["sender"];
  client.hget(hkey, "number_of_rooms", (err, res) => {
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
  client.hset(hkey, "number_of_rooms", "1", redis.print);

  for (var key in data) {
    if (key.includes("sender")) {
      continue;
    }
    const value = data[key];
    key = key + "_1";
    client.hset(hkey, key, value, redis.print);
  }
}

function addToHash(hkey, data, number_of_rooms) {
  isRoomExist(hkey, data, number_of_rooms).then((bools) => {
    const roomId = data.room_id;
    console.log("bools is " + bools);

    client.hgetall(hkey, (err, results) => {
      let roomNo;
      for (const key in results) {
        const value = results[key];
        if (value == roomId) {
          roomNo = key.charAt(key.length - 1);
        }
      }

      if (bools.includes(true)) {
        for (var key in data) {
          if (key.includes("sender") || key.includes("token")) {
            continue;
          }
          const value = data[key];
          key = key + "_" + roomNo;
          client.hset(hkey, key, value, redis.print);
        }
      } else {
        number_of_rooms = (parseInt(number_of_rooms) + 1).toString();
        client.hset(hkey, "number_of_rooms", number_of_rooms, redis.print);

        for (var key in data) {
          if (key.includes("sender") || key.includes("token")) {
            continue;
          }
          const value = data[key];
          key = key + "_" + roomNo;
          client.hset(hkey, key, value, redis.print);
        }
      }
    })
  })
}


function isRoomExist(hkey, data, number_of_rooms) {
  const newRoom = data["room_id"];
  const keys = [1, 2, 3];
  const rooms = keys.map(key => "room_id_" + key.toString());
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
  updateRecentMessage,
  updateAllParticipants
}