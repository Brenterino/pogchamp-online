import Client from "./client.js";

export default class Game extends Phaser.Scene {

    preload() {
        this.player = null;
        this.players = new Map();
        this.client = new Client();

        this.load.image("background", "assets/background.png");
        this.load.image("icon", "assets/player/icon.png");
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.input.on("pointerdown", this.click, this);

        this.add.image(0, 0, "background").setOrigin(0, 0);

        this.chatActive = false;

        this.chatbox = this.add.graphics();
        this.chatbox.fillStyle(0xffffff, 1);
        this.chatbox.fillRect(0, this.sys.canvas.height - 50, this.sys.canvas.width, 50);
        this.chatbox.alpha = 0.25;

        this.chat = this.add.text(15, this.sys.canvas.height - 45, "", { font: "32px Arial", fill: "#000000" });

        this.input.keyboard.on("keydown", event => {
            if (!this.chatActive) {
                return;
            }
            if (event.keyCode === 8 && this.chat.text.length > 0) {
                this.chat.text = this.chat.text.substr(0, this.chat.text.length - 1);
            } else if (this.chat.text.length < 65 &&
                        (event.keyCode === 32 ||
                        (event.keyCode >= 48  && event.keyCode < 91)  ||
                        (event.keyCode >= 106 && event.keyCode < 112) ||
                            (event.keyCode >= 144))) {
                this.chat.text += event.key;
            } else if (event.keyCode === 13 && this.chat.text.length) {
                this.client.sendMessage(this.chat.text);
                this.chat.text = "";
            }
        });

        this.chatHistoryBox = this.add.graphics();
        this.chatHistoryBox.fillStyle(0xeeeeee, 1);
        this.chatHistoryBox.fillRect(0, this.sys.canvas.height - 250, this.sys.canvas.width / 2, 200);
        this.chatHistoryBox.alpha = 0.75;

        this.chatHistory = this.add.text(15, this.sys.canvas.height - 250, "\n\n\n\n\n\n\n\n\n\n", { font: "16px Arial", fill:"#111111"});

        this.client.init(this);
    }

    update() {
        if (this.player == null) {
            console.log("Not updating because player is null");
            return;
        }
        if (this.chatActive) {
            this.chatbox.alpha = 0.75;
        } else {
            this.chatbox.alpha = 0.25;
            this.handleMovement();
        }
    }

    click(event) {
        if (event.downY > this.sys.canvas.height - 50) {
            this.chatActive = true;
        } else {
            this.chatActive = false;
            this.player.icon.scaleX *= -1;
            this.client.sendMovement(this.player);
        }
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

        icon.angle = Math.floor(icon.angle);

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
             this.syncNameTag(this.player);
        }
    }

    addPlayer(data) {

        const player = {
            id: data.id,
            name: data.name,
            x: data.x,
            y: data.y,
            angle: data.angle,
            speed: data.speed
        };

        player.rectangle = this.add.graphics();
        player.rectangle.fillStyle(0x000000, 1);
        player.rectangle.fillRoundedRect(0, 0, 100, 25, 4);
        player.rectangle.alpha = 0.3;

        player.text = this.add.text(data.x, data.y, data.name, { font: "20px Arial" });
        player.text.setOrigin(0.5);

        player.icon = this.add.image(data.x, data.y, "icon");
        player.icon.setOrigin(0.5);
        player.icon.angle = data.angle;
        player.icon.scaleX *= data.mirrored ? -1 : 1;

        this.syncNameTag(player);

        this.players.set(data.id, player);

        return player;
    }

    syncNameTag(player) {
        player.rectangle.x = player.icon.x - 50;
        player.rectangle.y = player.icon.y + player.icon.height / 2 + 4;

        player.text.x = player.icon.x;
        player.text.y = player.icon.y + player.icon.height / 2 + 16;
    }

    setSelf(player) {
        this.player = player;
    }

    movePlayer(data) {
        const toMove = this.players.get(data.id);

        if (!toMove) {
            console.log("Tried to move non-existent player with id: " + data.id);
            return;
        }

        if (toMove.id === this.player.id) {
            console.log("Tried to move self.");
            return;
        }

        toMove.icon.x = data.x;
        toMove.icon.y = data.y;
        toMove.icon.angle = data.angle;
        toMove.icon.scaleX = data.mirrored ? -1 : 1;

        this.syncNameTag(toMove);
    }

    removePlayer(data) {
        const toRemove = this.players.get(data.id);

        if (!toRemove) {
            console.log("Tried to remove non-existent player with id: " + data.id);
            return;
        }

        toRemove.icon.destroy();
        toRemove.text.destroy();
        toRemove.rectangle.destroy();

        this.players.delete(data.id);
    }

    displayMessage(data) {
        const player = this.players.get(data.id);

        if (!player) {
            console.log("Tried to provide chat for non-existent player with id: " + data.id);
            return;
        }

        this.chatHistory.text = this.chatHistory.text.substr(this.chatHistory.text.indexOf("\n") + 1);

        this.chatHistory.text += (player.name + ": " + data.text);
        this.chatHistory.text += '\n';

        console.log(player.name + ": " + data.text);
    }
}
