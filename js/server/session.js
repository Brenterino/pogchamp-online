var Player  = require('./player.js');

module.exports = class Session {

	constructor(socket) {
		this._socket = socket;
	}

	open() {
		console.log('Session was opened.');

		this.onEnter(this._socket);
		this.onMovement(this._socket);
		this.onChat(this._socket);
		this.onDisconnect(this._socket);
	}

	close() {
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

	onMovement(socket) {
		socket.on('movement', function(data) {
			data.id = this._player.id;
 			console.log(data);

			socket.broadcast.emit('move', data);
		});
	}

	onChat(socket) {
		socket.on('chat', function(data) {
			// can filter the chat message later to keep it sfl (maybe)
			data.id = this._player.id;

 			console.log(data);
			socket.broadcast.emit('chat', data);
		});
	}

	onDisconnect(socket) {
		socket.on('disconnect', function(data) {
			// clean up
		});
	}
}