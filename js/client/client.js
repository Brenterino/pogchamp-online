import io from "socket.io-client";

export default class Client {

    init(game) {
        this.game = game;
        this.socket = io.connect();

        this.attachListeners();
        this.sendEnter();
    }

    attachListeners() {
        this.onEnterResponse();
        this.onMovement();
        this.onPlayerList();
        this.onPlayerJoin();
        this.onPlayerLeave();
	}

    onEnterResponse() {
        this.socket.on("enterResponse", data => {
            console.log("Received enterResponse data");
            console.log(data);

            const self = this.game.addPlayer(data);
            this.game.setSelf(self);
        });
    }

    onMovement() {
        this.socket.on("movement", data => {
            this.game.movePlayer(data);
        });
    }

    onPlayerList() {
        this.socket.on("playerList", data => {
            console.log("Received playerList data");
            console.log(data);

            this.game.addOtherPlayers(data);
        });
    }

    onPlayerJoin() {
        this.socket.on("playerJoin", data => {
            console.log("Received playerJoin data");
            console.log(data);

            this.game.addPlayer(data);
        });
    }

    onPlayerLeave() {
        this.socket.on("playerLeave", data => {
            console.log("Received playerLeave data");
            console.log(data);

            this.game.removePlayer(data);
        });
    }

    sendEnter() {
        console.log("Emitting enter");
        this.socket.emit("enter");
    }

    sendMovement(player) {
        this.socket.emit("movement", {
            x: player.icon.x,
            y: player.icon.y,
            angle: player.icon.angle,
            mirrored: player.icon.scaleX < 0
        });
    }
}
