export class Renderer {
    constructor(name, context, unit) {
        this.name = name;
        this.context = context
        this.unit = unit
    }

    render(world) {
        //render tiles
        let xBox = 0;
        let yBox = 0;
        let mapIndex = 0;
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 32; j++) {
                //draw tiles
                if (world.tiles[mapIndex].type == '01') {
                    this.context.drawImage(world.grassImage, xBox, yBox);

                }
                else if (world.tiles[mapIndex].type == '02') {
                    this.context.drawImage(world.wallImage, xBox, yBox);
                }
                else {
                    this.context.fillStyle = 'pink';
                    this.context.fillRect(xBox, yBox, this.unit, this.unit);
                }
                xBox += 32;
                mapIndex++;           
            }
            xBox = 0;
            yBox += 32;
        }

        //render player
        var playerEntity = world.player;
        this.context.drawImage(playerEntity.image, playerEntity.sx, playerEntity.sy, this.unit, this.unit, playerEntity.x, playerEntity.y, this.unit, this.unit)
        

        //render entities
        for (let i = 0; i < world.entities.length; i++) {
            var tempEntity = world.entities[i];
            this.context.drawImage(tempEntity.image, tempEntity.sx, tempEntity.sy, this.unit, this.unit, tempEntity.x, tempEntity.y, this.unit, this.unit)
        }
        
        //render healthbar
        this.context.fillStyle = '#dc5432';
        this.context.fillRect(765,16, world.player.hp * 16,16)
    }
}