/*
Nathan Altice
Created: 02/17/23
Vampire Dissection 01: Normalized Movement
Spritesheet by ElvGames: https://elv-games.itch.io/free-fantasy-dreamland-sprites
*/

"use strict";

let cursors;

class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key:'playScene'});
    }

    preload() {
        this.load.path = './assets/img/';
        this.load.spritesheet('player', 'Character_002.png', {
            frameWidth: 48,
            frameHeight: 48,
        });
    }

    create() {
        this.cameras.main.setBackgroundColor(0xDDDDDD);
        this.VELOCITY = 5;
        this.player = this.add.sprite(400, 400, 'player', 1).setScale(2);
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // store direction vector
        let playerDirection = new Phaser.Math.Vector2(0, 0);
        // handle left/right
        if(cursors.left.isDown) {
            playerDirection.x = -1;
        } else if(cursors.right.isDown) {
            playerDirection.x = 1;
        }
        // handle up/down
        if(cursors.up.isDown) {
            playerDirection.y = -1;
        } else if(cursors.down.isDown) {
            playerDirection.y = 1;
        }
        // account for diagonals
        playerDirection.normalize();
        // update player position
        this.player.x += playerDirection.x * this.VELOCITY;
        this.player.y += playerDirection.y * this.VELOCITY;
    }
}

let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 800,
    height: 800,
    scene: [ PlayScene ]
}

const game = new Phaser.Game(config);