import Phaser from "phaser";
import Game from "./game.js";

const config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    scene: [ Game ]
};

const phaser = new Phaser.Game(config);
