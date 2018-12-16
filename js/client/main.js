const WINDOW_WIDTH = 1280;
const WINDOW_HEIGHT = 720;

var element = document.getElementById('game');
var phaser = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.CANVAS, element);

var game = new Game();
phaser.state.add('Game', game);
phaser.state.start('Game');

var client = new Client(game);
