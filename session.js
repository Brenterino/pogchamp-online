var Player  = require('./player.js');

module.exports = class Session {

	constructor(socket) {
		this._socket = socket;
	}

	sessionOpened() {
		console.log('Session was opened.');

		this.onEnter(this._socket);
		this.onMove(this._socket);
		this.onChat(this._socket);
		this.onDisconnect(this._socket);
	}

	sessionClosed() {
		console.log('Session was closed.');
		// do other stuff
	}

	onEnter(socket) {
		socket.on('enter', function() {
			let response = {
				id: 1,
				name: "yolo"
			};

			console.log(response);

			socket.emit('enterResponse', response);
		});
	}

	onMove(socket) {
		socket.on('move', function(message) {
			// can verify movement makes sense later if necessary
			this.broadcastMessage('move', message);
		});
	}

	onChat(socket) {
		socket.on('chat', function(message) {
			// can filter message later if necessary
			this.broadcastMessage('chat', message);
		});
	}

	onDisconnect(socket) {
		socket.on('disconnect', function(message) {
			// clean up
		});
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
