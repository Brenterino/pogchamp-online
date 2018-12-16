var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

var Session = require('./js/server/session.js');

app.use('/build',express.static(__dirname + '/build'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    const session = new Session(socket);

    session.open();
});

app.set('port', (process.env.PORT || 8081));

http.listen(app.get('port'), function() {
    console.log('Listening on port ' + http.address().port);
});
