
var app = {

  server: 'http://127.0.0.1:3000/classes/login',
  usernames: [],

  init: function() {
    app.$username = $('#username');
    app.$password = $('#password');
    app.$send = $('#send');
    app.fetch();
    app.$send.on('submit', app.handleSubmit);
  },

  handleSubmit: function(evt) {
    var username = app.$username.val().toLowerCase();
    var password = app.$password.val();
    var result = false;
    if (username && password) {
      app.usernames.forEach(function(item) {
        if (item.username === username) {
          result = true;
          if (item.password === password) {
            alert('Welcome back! Login succeeded.');
          } else {
            alert('This username exists. But the password does not match.');
          }
        } 
      });
    } else {
      alert('Username and the password required.');
      result = true;
    }

    if (!result) {
      alert('Welcome! Login created.');
      app.send({username: username, password: password});
    }

    evt.preventDefault();

  },

  send: function(data) {
    // POST the message to the server
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (data) {
        console.log('Succeeded to send the username');
        // Trigger a fetch to update the messages, pass true to animate
        app.fetch();
      },
      error: function (data) {
        console.error('Failed to send the username', data);
      }
    });
  },

  fetch: function(animate) {
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        app.usernames = JSON.parse(data);
        console.log('Succeded to get the usernames');
      },
      error: function(data) {
        console.error('Failed to get the usernames', data);
      }
    });
  },

}; 