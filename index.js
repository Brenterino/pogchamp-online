var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

var User  = require('./user.js');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  let user = new User(socket);

  user.sessionOpened();
});

http.listen(80, function() {
  console.log('Server listening on port *:80');
});
