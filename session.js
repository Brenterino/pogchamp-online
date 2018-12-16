var Player  = require('./player.js');

module.exports = class User {

  constructor(socket) {
    this._socket = socket;
  }

  sessionOpened() {
    console.log('Session was opened.');

    this._socket.on('enter', this.processPlayerEntry);
    this._socket.on('chat', this.processChatMessage);
    this._socket.on('disconnect', this.sessionClosed);
  }

  sessionClosed() {
    console.log('Session was closed.');
    // do other stuff
  }

  processPlayerEntry(message) {
    this._player = new Player(message.name);

    // console.log(this._player.name.concat(' has joined!'));
  }

  processChatMessage(message) {
    // console.log(message);
    // if (typeof this._player == "undefined") {
    //   console.log('Uninitialzied player tried sending a message!');
    //   return;
    // }
    if (message.sender === this_.player.name())
      this._socket.broadcast.emit('chat', message); // not sure if this is right
    else
      console.log('User '.concat(this._player.name(), ' tried to send a message for someone else!'));
  }
}
