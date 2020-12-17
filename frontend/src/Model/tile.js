export class Tile {
    constructor(x,y, width, height, type, unit) {
        this.x = (x-1)*unit;
        this.y = (y-1)*unit;
        this.width = width;
        this.height = height;
        this.type = type
    }

    get topBorder() {return this.y;}
    get leftBorder() {return this.x;}
    get rightBorder() {return this.x + this.width}
    get bottomBorder() {return this.y + this.height}
}