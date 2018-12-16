import Client from "./client.js";

export default class Game extends Phaser.Scene {

    constructor() {
        super('GameScene');
    }

    preload() {
        this.player = null;
        this.players = [];
        this.client = new Client();

        this.load.image('background', 'assets/background.png');
        this.load.image('icon', 'assets/player/icon.png');

        console.log("Game preloaded");
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.add.image(0, 0, 'background').setOrigin(0, 0);

        this.client.init(this);

        console.log("Game created");
    }

    update() {
        if (this.player == null) {
            console.log("Not updating because player is null");
            return;
        }

       this.handleMovement();
    }

    handleMovement() {
        const icon = this.player.icon;
        let moved = false;

        if (this.cursors.up.isDown) {
            icon.y -= this.player.speed;
            moved = true;
        } else if (this.cursors.down.isDown) {
            icon.y += this.player.speed;
            moved = true;
        }

        if (this.cursors.left.isDown) {
            icon.x -= this.player.speed;
            moved = true;
        } else if (this.cursors.right.isDown) {
            icon.x += this.player.speed;
            moved = true;
        }

        if (this.keyQ.isDown) {
            icon.angle -= this.player.speed;
            moved = true;
        } else if (this.keyE.isDown) {
            icon.angle += this.player.speed;
            moved = true;
        }

        if (moved) {
             this.client.sendMovement(this.player);
        }
    }

    addSelf(data) {

        this.player = {
            id: data.id,
            name: data.name,
            x: data.x,
            y: data.y,
            angle: data.angle,
            speed: 3,
            icon: this.add.sprite(data.x, data.y, 'icon')
        };

        this.player.icon.angle = data.angle;
        this.player.icon.setOrigin(0.5);

        this.players[data.id] = this.player;
    }

    addPlayer(data) {

        const newPlayer = {
            id: data.id,
            name: data.name,
            x: data.x,
            y: data.y,
            angle: data.angle,
            speed: 3,
            icon: this.add.sprite(data.x, data.y, 'icon')
        };

        this.players[data.id] = newPlayer;
    }

    movePlayer(data) {
        const toMove = this.players[data.id];

        if (!toMove) {
            console.log("Tried to move non-existent player with id: " + toMove.id);
            return;
        }

        if (toMove.id === this.player.id) {
            console.log("Tried to move self.");
            return;
        }

        console.log(data);

        toMove.icon.x = data.x;
        toMove.icon.y = data.y;
    }

    removePlayer(data) {
        const toRemove = this.players[data.id];

        if (!toRemove) {
            console.log("Tried to remove non-existent player with id: " + toRemove.id);
            return;
        }

        console.log(data);
    }
}
