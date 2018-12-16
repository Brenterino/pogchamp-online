import Phaser from 'phaser';
import Game from "./game.js";

var config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [
        Game
    ]
};

var phaser = new Phaser.Game(config);
