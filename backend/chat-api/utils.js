const fetch = require('node-fetch');

async function getUserId(token) {
  const url = 'http://localhost:8080/api/users/16/token?token=' + token;
  const userId = await fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data.userID
    })
  return userId;
}

module.exports = {
  getUserId
}