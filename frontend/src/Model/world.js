import {Tile} from './tile'
import {Enemy} from './enemy'

export class World {
    constructor(name, player, width, height, UNIT, socket, grassImage, wallImage, enemyImage) {
        this.name = name;

        this.gravity = 0;
        this.friction = .4;

        this.player = player
        this.entities = [];     //every monster and projectile
        this.tiles = [];        //every square in the gameboard
        this.platforms = [];    //every square with a type of 2, aka ice tiles!

        this.width = width;
        this.height = height;
        this.UNIT = UNIT

        this.socket = socket

        this.wallImage = wallImage;
        this.grassImage = grassImage;
        this.enemyImage = enemyImage;
    }

    update() {
        //GET INFORMATION FROM THE WEBSOCKET
        this.socket.on('respondAllPositions', ({name, x, y, facing}) => {
            let tempEntity = new Enemy(name, parseInt(x), parseInt(y), this.enemyImage, facing)
            this.entities = [tempEntity]
        });

        //apply vector forces to player
        this.applyCollisions(this.player)

        //apply vector forces to all enemies
        for (let i = 0; i < this.entities.length; i++) {
            this.applyCollisions(this.entities[i]);
        }
    }

    loadLevel(inputArray) { //for each item in levelOne, we create a tile and add it to the world.tiles array. (world.tiles[index].topBorder() would return the y height) )
        for (let i = 0; i < inputArray.length; i++) {
            //constructor(x,y, width, height, type, UNIT)
            var tempTile = new Tile((i % 32), Math.floor(i / this.UNIT), this.UNIT, this.UNIT, inputArray[i], this.UNIT);
            this.tiles.push(tempTile);
            if (tempTile.type == "02") this.platforms.push(tempTile);

            //TILE DEBUGGING
            if (tempTile.type == "03")
            {
                 this.platforms.push(tempTile);
                 console.log("top is " + tempTile.topBorder)
                 console.log("bot is " + tempTile.bottomBorder)
                 console.log("lef is " + tempTile.leftBorder)
                 console.log("rig is " + tempTile.rightBorder)
            }
        }
        console.log(this.platforms)
    }

    applyCollisions(entity) {
        //run the internalUpdate functions on all entities, updating their INTENDED velocities based on input
        entity.internalUpdate();

        entity.lastY = entity.y;
        entity.lastX = entity.x;
        entity.y -= entity.velocityY;
        entity.x += entity.velocityX;

        if (entity.velocityX > 0) entity.velocityX -= this.friction;
        if (entity.velocityX < 0) entity.velocityX += this.friction;
        if (entity.velocityY > 0) entity.velocityY -= this.friction;
        if (entity.velocityY < 0) entity.velocityY += this.friction;
        if (entity.velocityX > -.3 && entity.velocityX < .3) entity.velocityX = 0; //kill low float drift
        if (entity.velocityY > -.3 && entity.velocityY < .3) entity.velocityY = 0; //kill low float drift

        //keep within border box
        if (entity.y > 736) {entity.y = 736; entity.velocityY = 0;}
        if (entity.y < 0) {entity.y = 0; entity.velocityY = 0;}
        if (entity.x > 992) {entity.x = 992; entity.velocityX = 0; }
        if (entity.x < 0) {entity.x = 0; entity.velocityX = 0; }

        for (let i = 0; i < this.platforms.length; i++) 
        {
            //THIS SET OF COLLISIONS DEFINES DOWNWARD MOVEMENT TOWARDS TOP BORDERS
            if (entity.x > this.platforms[i].leftBorder && entity.x < (this.platforms[i].rightBorder+32) && entity.y > this.platforms[i].topBorder && entity.y < (this.platforms[i].bottomBorder+32)) 
            {
                entity.velocityX = 0;
                entity.velocityY = 0;
                entity.x = entity.lastX;
                entity.y = entity.lastY;
            }
        }
    }
}