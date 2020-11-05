export default class circleMover{ //makes moving objects easier by handling all vector math
    constructor(pWidth, pHeight){
        
        this.startingVelocity = p5.Vector.random2D();
        this.startingVelocity.mult(3);
        this.position = new p5.Vector(pWidth/2, pHeight/2); //starting position is center top of canvas
        this.velocity = this.startingVelocity//calculate random inital starting velocity
        this.size = 20;
        this.color = {
        r: 0,
        g: 0,
        b: 0
        }
        this.boundary = {
            width: pWidth,
            height: pHeight
        }
    }
    updatePosition(){ //calculate the new position after moving in the direction of the random vector
        let positionX, positionY;
        this.position.add(this.velocity); //move the object by vector
        positionX = this.position.x;
        positionY = this.position.y;
        if ((positionX > this.boundary.width-10) || (positionX< 10)) {
        this.velocity.x = this.velocity.x * -1;
        }
        if ((positionY > this.boundary.height-10) || (positionY < 10)) {
        this.velocity.y = this.velocity.y * -1;
        }
    }
    }