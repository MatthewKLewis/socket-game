export class Enemy {
    constructor(name, x, y, image, facing) {
        this.name = name;

        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.sx = 0;
        this.sy = 0;

        this.lastX = 0;
        this.lastY = 0;

        this.image = image
        this.facing = facing
    }

    internalUpdate() {
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
    }
}