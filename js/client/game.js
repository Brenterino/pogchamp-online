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
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.input.on('pointerdown', this.click, this);

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

    click() {
        console.log("Click detected");
        this.player.icon.scaleX *= -1;
    }

    handleMovement() {
        const icon = this.player.icon;
        let moved = false;

        if (this.cursors.up.isDown || this.keyW.isDown) {
            icon.y -= this.player.speed;
            moved = true;
        } else if (this.cursors.down.isDown || this.keyS.isDown) {
            icon.y += this.player.speed;
            moved = true;
        }

        if (this.cursors.left.isDown || this.keyA.isDown) {
            icon.x -= this.player.speed;
            moved = true;
        } else if (this.cursors.right.isDown || this.keyD.isDown) {
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

        if (icon.x - icon.width / 2 < 0) {
            icon.x = icon.width / 2;
        } else if (icon.x - icon.width / 2 > this.sys.canvas.width - icon.width) {
            icon.x = this.sys.canvas.width - icon.width / 2;
        }

        if (icon.y - icon.height / 2 < 0) {
            icon.y = icon.height / 2;
        } else if (icon.y - icon.height / 2 > this.sys.canvas.height - icon.height) {
            icon.y = this.sys.canvas.height - icon.height / 2;
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
