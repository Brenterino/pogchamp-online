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
		socket.on('enter', function(data) {
			this._player = new Player(1, "yolo");

			let response = {
				id: this._player.id,
				name: this._player.name,
				x: this._player.x,
				y: this._player.y,
				angle: this._player.angle
			};

			console.log(response);

			socket.emit('enterResponse', response);
			socket.broadcast.emit('playerJoin', response); // change response later
		});
	}

	onMove(socket) {
		socket.on('move', function(data) {
			let playerMove = {
				sender: this._player.id,
				data: data
			}
			console.log(playerMove);
			// can verify movement makes sense later if necessary
			socket.broadcast.emit('move', playerMove);
		});
	}

	onChat(socket) {
		socket.on('chat', function(data) {
			let playerChat = {
				sender: this._player.id,
				data: data
			}
			console.log(playerChat);
			// can filter data later if necessary
			socket.broadcast.emit('chat', playerChat);
		});
	}

	onDisconnect(socket) {
		socket.on('disconnect', function(data) {
			// clean up
		});
	}
}
