// var db = require('../db');
// db = db.connect();

// module.exports = {

//   messages: {
//     get: function (callback) {
//       db.query('SELECT * FROM messages', function(err, data) {
//         if (err) throw err;
//         callback(data);
//       });
//     }, // a function which produces all the messages
//     post: function (message) {
//       db.query('INSERT INTO messages (username, msg, roomname) VALUES ("' + message.username + '","' + message.msg + '","' + message.roomname + '")', function(err, results) {
//         if (err) throw err;
//         console.log(results);
//       });
//     } // a function which can be used to insert a message into the database
//   }

// };

//Sequlize version - this replaces the above codes and the db file.
var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '1234');

var Message = db.define('Message', {
  username: Sequelize.STRING,
  msg: Sequelize.STRING,
  roomname: Sequelize.STRING
}, {
  timestamps: false
});

module.exports = {

  messages: {
    post: function(message) {
      Message.sync()
        .then(function() {
          return Message.create({
            username: message.username,
            msg: message.msg,
            roomname: message.roomname
          });
        })
        .then(function(results) {
          console.log(results);
        })
        .catch(function(err) {
          console.log(err);
          db.close();
        });
    },
    get: function(callback) {
      Message.sync()
        .then(function() {
          return Message.findAll();
        })
        .then(function(messages) {
          callback(messages);
        })
        .catch(function(err) {
          console.log(err);
          db.close();
        });
    }  
  }
};


