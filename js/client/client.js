class Client {

    constructor(game) {
        this.game = game;
        this.socket = io.connect();

        this.socket.on('enterResponse', data => {
            console.log("Received enterResponse data");
            console.log(data);
            this.game.addSelf(data);
        });

        this.socket.on('movement', data => {
            console.log("Received movement data");
            console.log(data);
            this.game.handleMovement(data);
        });
    }

    sendJoin() {
        console.log("Emitting enter");
        this.socket.emit('enter');
    }

    sendMovement(player) {
        console.log("Emitting movement");
        this.socket.emit('movement', {
            x: player.icon.x,
            y: player.icon.y,
            angle: player.icon.angle
        });
    }
}
