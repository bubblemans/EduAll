const redis = require('redis');

const client = redis.createClient();
client.on('connect', () => {
  console.log('Redis connected.');
})

async function getRecentMessages(user, callback) {
  client.hgetall(user, (err, res) => {
    callback(res);
  })
}

module.exports = {
  getRecentMessages
}