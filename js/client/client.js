export default class Client {

    constructor() {
        this.socket = io.connect();
    }

    init(game) {
        this.game = game;
        console.log("Client init");

        this.socket.on('enterResponse', data => {
            console.log("Received enterResponse data");
            console.log(data);
            game.addSelf(data);
        });

        this.socket.on('movement', data => {
            console.log("Received movement data");
            console.log(data);
            game.handleMovement(data);
        });

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
