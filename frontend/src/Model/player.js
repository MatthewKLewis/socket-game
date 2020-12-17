export class Player {
    constructor(name, x, y, socket, image) {
        this.name = name;

        this.image = image;
        
        this.x = x;
        this.y = y;
        this.sx = 0;
        this.sy = 0;
        this.facing = 'right'

        this.lastX = 0;
        this.lasyY = 0;

        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 1;
        this.jumpForce = 16;

        this.hp = 15;
        
        //input booleans
        this.upPressed = false;
        this.downPressed = false;
        this.rightPressed = false;
        this.leftPressed = false;

        //socketio
        this.socket = socket;
    }

    internalUpdate() {
        if (this.hp > 0) {
            if (this.rightPressed) {
                this.velocityX += this.speed;
                this.facing = 'right'
            }
            if (this.leftPressed) {
                this.velocityX -= this.speed;
                this.facing = 'left';
            }
            if (this.upPressed) {
                this.velocityY += this.speed;
                this.facing = 'up';
            }
            if (this.downPressed) {
                this.velocityY -= this.speed;
                this.facing = 'down';
            }
        }
        //Animation
        if (this.facing == 'up') {
            this.sx = 0;
            this.sy = 0;
        }
        else if (this.facing == 'left') {
            this.sx = 32;
            this.sy = 0;
        }
        else if (this.facing == 'down') {
            this.sx = 64;
            this.sy = 0;
        }
        else if (this.facing == 'right') {
            this.sx = 96;
            this.sy = 0;
        }

        //send info to socket
        this.socket.emit('setPosition', {name: this.name, x: this.x, y: this.y, facing: this.facing})
    }
}