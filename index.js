var express = require('express');
var app = express();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

var Session = require('./session.js');

app.use('/js',express.static(__dirname + '/js'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    let session = new Session(socket);

    session.sessionOpened();
});

app.set('port', (process.env.PORT || 8081));

http.listen(app.get('port'), function() {
    console.log('Listening on port ' + http.address().port);
});
