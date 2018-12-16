class Client {

    constructor(game) {
        this.game = game;
        this.socket = io.connect();

        this.socket.on('enterResponse', data => {
            this.game.addSelf(data);
        });

        this.socket.on('movement', data => {
            console.log("New movement data");
            console.log(data);
            this.game.handleMovement(data);
        });
    }

    join() {
        console.log("sending enter message!");
        this.socket.emit('enter');
    }

    sendMovement(player) {
        this.socket.emit('movement', {
            x: player.icon.x,
            y: player.icon.y,
            angle: player.icon.angle
        });
    }
}

var client = new Client(game);
