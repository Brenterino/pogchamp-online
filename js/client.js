class Client {

    constructor(game) {
        this.game = game;
        this.socket = io.connect();

        this.socket.on('enterResponse', data => {
            this.game.addPlayer(data.id, data.name);
        });

        this.join();
    }

    join() {
        console.log("sending enter message!");
        this.socket.emit('enter');
    }
}

var client = new Client(game);
