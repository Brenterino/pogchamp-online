class Client {

    constructor(game) {
        this.game = game;
        this.socket = io.connect();
        this.join();
    }

    join() {
        console.log("sending enter message!");
        this.socket.emit('enter', {
            name: "yolo"
        });
    }
}

var client = new Client(game);
