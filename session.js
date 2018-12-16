var Player  = require('./player.js');

module.exports = class Session {

	constructor(socket) {
		this._socket = socket;
	}

	sessionOpened() {
		console.log('Session was opened.');

		let processPlayerEntryHandle = (function() { this.processPlayerEntry(); }).bind(this);
		let processPlayerMoveHandle = (function() { this.processPlayerMove(); }).bind(this);
		let processChatMessageHandle = (function() { this.processChatMessage(); }).bind(this);
		let sessionClosedHandle = (function() { this.sessionClosed(); }).bind(this);

		this._socket.on('enter', processPlayerEntryHandle);
		this._socket.on('move', processPlayerMoveHandle);
		this._socket.on('chat', processChatMessageHandle);
		this._socket.on('disconnect', sessionClosedHandle);
	}

	sessionClosed() {
		console.log('Session was closed.');
		// do other stuff
	}

	processPlayerEntry(message) {
		console.log(this.constructor.name);
		this._player = new Player(message.name);
		// console.log(this._player.name.concat(' has joined!'));
	}

	processPlayerMove(message) {
		// can verify movement makes sense later if necessary
		this.broadcastMessage('move', message);
	}

	processChatMessage(message) {
		// can filter message later if necessary
		this.broadcastMessage('chat', message);
	}

	broadcastMessage(eventType, message) {
		if (typeof this._player != "undefined") {
			if (message.sender === this._player.name)
				this._socket.broadcast.emit(eventType, message); // not sure if this is right
			else
				console.log('User '.concat(this._player.name, ' tried to send a message for someone else!'));
		}
	}
}
