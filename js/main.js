var el = document.getElementById('game');
const WINDOW_WIDTH = 1280;
const WINDOW_HEIGHT = 720;
var phaser = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.CANVAS, el);

var game = new Game();
phaser.state.add('Game', game);
phaser.state.start('Game');
