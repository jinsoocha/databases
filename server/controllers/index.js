var models = require('../models');

module.exports = {

  headers: {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  },

  messages: {
    get: function (req, res) {
      res.writeHead(200, this.headers);
      models.messages.get(function(result) {
        res.end(JSON.stringify(result));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      res.writeHead(201, this.headers);
      res.end(models.messages.post(req.body));
    } // a function which handles posting a message to the database
  },



  users: {
    get: function (req, res) {
      res.writeHead(200, this.headers);
      models.users.get(function(result) {
        res.end(JSON.stringify(result));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      res.writeHead(201, this.headers);
      res.end(models.users.post(req.body));
    } // a function which handles posting a message to the database
  }
};

