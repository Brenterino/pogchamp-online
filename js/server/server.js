const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
const path = require('path');

const Session = require('./session.js');

const root = path.join(__dirname, '../..');

app.use('/build', express.static(path.join(root, 'build')));
app.use('/assets', express.static(path.join(root, 'assets')));

app.get('/', function(req, res) {
    res.sendFile(path.join(root, 'assets/index.html'));
});

io.on('connection', function(socket) {
    const session = new Session(socket);

    session.open();
});

app.set('port', (process.env.PORT || 8081));

http.listen(app.get('port'), function() {
    console.log('Listening on port ' + http.address().port);
});
