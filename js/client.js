class Client {

    constructor(game) {
        this.game = game;
        this.socket = io.connect();

        this.socket.on('enterResponse', data => {
            this.game.addPlayer(data);
        });
    }

    join() {
        console.log("sending enter message!");
        this.socket.emit('enter');
    }

    sendMovement(player) {
        this.socket.emit('movement', {
            id: player.id,
            x: player.x,
            y: player.y,
            angle: player.angle
        });
    }
}

var client = new Client(game);
