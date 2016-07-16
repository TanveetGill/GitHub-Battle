var axios = require('axios');

// If github limits use of API
var id = 'YOUR_CLIENT_ID'
var sec = 'YOUR_SEC_ID'
var param = '?client_id' + id + '&client_secret' + sec;

function getUserInfo (username) {
  return axios.get('https://api.github.com/users/' + username + param)
}

var helpers = {
  getPlayersInfo: function (players) {
    return axios.all(players.map(function (username) {
      return getUserInfo(username)
    })).then(function (info) {
      // doing return keeps returning use promises, meaning we can call .then on these promises elsewhere to handle them
      return info.map(function (user) {
        return user.data;
      })
    }).catch(function (err) {
      console.warn('Error in getPlayersInfo', err)
    })
  }
};

module.exports = helpers;