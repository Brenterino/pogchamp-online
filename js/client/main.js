const WINDOW_WIDTH = 1280;
const WINDOW_HEIGHT = 720;

const element = document.getElementById('game');
const phaser = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.CANVAS, element);

const game = new Game();

const client = new Client(game);
