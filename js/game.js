class Game {

    constructor() {
        this.player = null;
        this.players = {};
    }

    init() {
        phaser.stage.disableVisibilityChange = true;
    }

    preload() {
        // load sprites
        phaser.load.image('background', 'assets/background.png');
        phaser.load.image('icon', 'assets/player/icon.png');

        console.log("Game preloaded");
    }

    create() {
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.eKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        phaser.add.tileSprite(0, 0, 1280, 720, 'background');

        client.join();
        console.log("Game created");
    }

    inputFocus(sprite) {
        sprite.canvasInput.focus();
    }

    createInput(x, y) {
        // textbox input
    }

    update() {
        // update method
        if (this.player == null) {
            return;
        }

        this.handleMovement();
    }

    handleMovement() {
        var moved = false;
        var icon = this.player.icon;

        if (this.upKey.isDown) {
            icon.y -= this.player.speed;
            moved = true;
        } else if (this.downKey.isDown) {
            icon.y += this.player.speed;
            moved = true;
        }

        if (this.leftKey.isDown) {
            icon.x -= this.player.speed;
            moved = true;
        } else if (this.rightKey.isDown) {
            icon.x += this.player.speed;
            moved = true;
        }

        if (this.qKey.isDown) {
            icon.angle -= this.player.speed;
            moved = true;
        } else if (this.eKey.isDown) {
            icon.angle += this.player.speed;
            moved = true;
        }

        if (moved) {
            client.sendMovement(this.player);
        }
    }

    addSelf(data) {
        console.log("Adding self");
        console.log(data);

        this.player = {
            id: data.id,
            name: data.name,
            x: data.x,
            y: data.y,
            angle: data.angle,
            speed: 3,
            icon: phaser.add.sprite(data.x, data.y, 'icon')
        };

        this.player.icon.angle = data.angle;
        this.player.icon.anchor.setTo(0.5, 0.5);

        this.players[data.id] = this.player;
    }

    addPlayer(data) {

        var newPlayer = {
            id: data.id,
            name: data.name,
            x: data.x,
            y: data.y,
            angle: data.angle,
            speed: 3,
            icon: phaser.add.sprite(data.x, data.y, 'icon')
        };

        this.players[data.id] = newPlayer;
    }

    movePlayer(data) {
        var toMove = this.players[data.id];

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

    sendMessage(data) {
        // method to send message to server
    }

    sentMessage(id, data) {
        // handle incoming message
    }

    removePlayer(id) {
        // remove player from your game
    }
}
