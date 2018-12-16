const Player = require('./player.js');

module.exports = class Session {

	constructor(socket) {
		this._socket = socket;
	}

	open() {
		const address = this._socket.handshake.address;
		console.log('New session opened from ' + address);

		this.attachListeners();
	}

	close() {
		console.log('Session was closed.');
		// do other stuff
	}

	attachListeners() {
		this.onEnter();
		this.onMovement();
		this.onChat();
		this.onDisconnect();
	}

	onEnter() {
		this._socket.on('enter', (data) => {
			this._player = new Player(1, "yolo");

			const response = {
				id: this._player.id,
				name: this._player.name,
				x: this._player.x,
				y: this._player.y,
				angle: this._player.angle
			};

			console.log(response);

			this._socket.emit('enterResponse', response);
			this._socket.broadcast.emit('playerJoin', response); // change response later
		});
	}

	onMovement() {
		this._socket.on('movement', (data) => {
			data.id = this._player.id;
			console.log(data);
			this._socket.broadcast.emit('movement', data);
		});
	}

	onChat() {
		this._socket.on('chat', (data) => {
			// can filter the chat message later to keep it sfl (maybe)
			data.id = this._player.id;

 			console.log(data);
			this._socket.broadcast.emit('chat', data);
		});
	}

	onDisconnect() {
		this._socket.on('disconnect', (data) => {
			console.log("Socket disconnected");
		});
	}
}
