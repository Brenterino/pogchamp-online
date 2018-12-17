import io from 'socket.io-client';

export default class Client {

    constructor() {
        this.socket = io.connect();
    }

    init(game) {
        this.game = game;
        console.log("Client init");

        this.attachListeners();
        this.sendEnter();
    }

    attachListeners() {
        this.onEnterResponse();
        this.onMovement();
        this.onPlayerList();
	}

    onEnterResponse() {
        this.socket.on('enterResponse', data => {
            console.log("Received enterResponse data");
            console.log(data);

            const self = this.game.addPlayer(data);
            this.game.setSelf(self);
        });
    }

    onMovement() {
        this.socket.on('movement', data => {
            console.log("Received movement data");
            console.log(data);
            this.game.handleMovement(data);
        });
    }

    onPlayerList() {
        this.socket.on('playerList', data => {
            console.log("Received playerList data");
            console.log(data);
            this.game.addOtherPlayers(data);
        });
    }

    sendEnter() {
        console.log("Emitting enter");
        this.socket.emit('enter', {

        });
    }

    sendMovement(player) {
        this.socket.emit('movement', {
            x: player.icon.x,
            y: player.icon.y,
            angle: player.icon.angle,
            mirrored: player.icon.scaleX < 0
        });
    }
}
