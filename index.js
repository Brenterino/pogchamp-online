var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

var Session = require('./session.js');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  let session = new Session(socket);

  session.sessionOpened();
});

http.listen(80, function() {
  console.log('Server listening on port *:80');
});
