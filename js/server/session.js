const Player = require('./player.js');

var current = 1; // temporary auto-incrementing ID

var currentPlayers = new Map(); // temporarily store players here

function createPlayerList() {
	return Array.from(currentPlayers.values())
				.map(player => player.asPayload());
}

module.exports = class Session {

	constructor(socket) {
		this._player = null;
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
			const id = current++;
			this._player = new Player(id, "yolo" + id);

			const playerData = this._player.asPayload();

			// not sure how costly this is, may have to choose a better way
			// move this to somewhere else
			const playerList = createPlayerList();

			currentPlayers.set(this._player.id, this._player);

			console.log(playerData);
			console.log(playerList);

			this._socket.emit('enterResponse', playerData);
			this._socket.emit('playerList', playerList);
			this._socket.broadcast.emit('playerJoin', playerData); // change response later
		});
	}

	onMovement() {
		this._socket.on('movement', (data) => {
			if (this._player == null)
				return;

			this._player.move(data); // store player location

			data.id = this._player.id;

			console.log(data);
			this._socket.broadcast.emit('movement', data);
		});
	}

	onChat() {
		this._socket.on('chat', (data) => {
			if (this._player == null)
				return;

			// can filter the chat message later to keep it sfl (maybe)
			data.id = this._player.id;

 			console.log(data);
			this._socket.broadcast.emit('chat', data);
		});
	}

	onDisconnect() {
		this._socket.on('disconnect', (data) => {
			console.log("Socket disconnected");

			if (this._player != null) {
				const removePlayer = {
					id: this._player.id
				}
				// can we still broadcast on a disconnectred socket?
				this._socket.broadcast.emit('playerLeave', removePlayer);
				currentPlayers.delete(this._player.id);
			}
		});
	}
}
