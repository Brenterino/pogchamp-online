var Player = require('./player.js');

module.exports = class Session {

	constructor(socket) {
		this._socket = socket;
	}

	open() {
		const address = this._socket.handshake.address;
		console.log('New session opened from ' + address);

		this.attachListeners(this._socket);
	}

	close() {
		console.log('Session was closed.');
		// do other stuff
	}

	attachListeners(socket) {
		this.onEnter(socket);
		this.onMovement(socket);
		this.onChat(socket);
		this.onDisconnect(socket);
	}

	onEnter(socket) {
		socket.on('enter', (data) => {
			this._player = new Player(1, "yolo");

			const response = {
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
		socket.on('movement', (data) => {
			data.id = this._player.id;
			console.log(data);
			socket.broadcast.emit('movement', data);
		});
	}

	onChat(socket) {
		socket.on('chat', (data) => {
			// can filter the chat message later to keep it sfl (maybe)
			data.id = this._player.id;

 			console.log(data);
			socket.broadcast.emit('chat', data);
		});
	}

	onDisconnect(socket) {
		socket.on('disconnect', (data) => {
			console.log("Socket disconnected");
		});
	}
}
