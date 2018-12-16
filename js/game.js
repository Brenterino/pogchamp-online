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

        console.log("Game preloaded");
    }

    create() {
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.background = game.add.tileSprite(0, 0, 1280, 720, 'background');

        console.log("Game created");

        // send client joined message
    }

    inputFocus(sprite) {
        sprite.canvasInput.focus();
    }

    createInput(x, y) {
        // textbox input
    }

    update() {
        // update method
    }

    handleMovement() {
        // handle movement
    }

    handleRotation() {
        // handle rotation
    }

    addPlayer(id, x, y) {
        // add player
    }

    movePlayer(id, x, y) {
        // move player
    }

    sendMessage(message) {
        // method to send message to server
    }

    sentMessage(id, message) {
        // handle incoming message
    }

    removePlayer(id) {
        // remove player from your game
    }
}
