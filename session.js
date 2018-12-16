var Player  = require('./player.js');

module.exports = class Session {

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
		console.log('New player: ' + message.name)
		this._player = new Player(message.name);
		// console.log(this._player.name.concat(' has joined!'));
	}

	processChatMessage(message) {
		// console.log(message);
		// if (typeof this._player == "undefined") {
		//   console.log('Uninitialzied player tried sending a message!');
		//   return;
		// }
		if (message.sender === this._player.name)
			this._socket.broadcast.emit('chat', message); // not sure if this is right
		else
			console.log('User '.concat(this._player.name, ' tried to send a message for someone else!'));
	}
}
