function setup() {
    createCanvas(400, 400);
}

function draw() {
    drawBackground();

    let handleX = 123;
    let handleY = 198;
    if(mouseIsPressed && mouseX>=123 && mouseX<=188 && mouseY>=198 && mouseY<=273){ //if mouse pressed in bounds then rotate handle
        rotateHandle(handleX, handleY);
    }else { //just draw rectangle
        fill(255,215,0,1000);
        rect(handleX,handleY,65,17); 
    }   
}

function rotateHandle(posX, posY){
    let angle = Math.atan2(mouseY-posY, mouseX-posX);
    if(angle >= 1.5){
        console.log("handle turned");
    }
    translate(123,198);
    rotate(angle);
    fill(255,215,0,1000);
    rect(0,0,65,17);
}

function drawBackground(){
    stroke('black');
    background(220);
    fill(202,164,114);
    rect(100,0,200,400);
    stroke('red');
    strokeWeight(7);
    fill(0,0,0,0);
    circle(145,210,120);
    stroke('black');
    strokeWeight(0.5);
    fill('gold');
    rect(110,170,30,80,10);
    fill('grey');
    circle(125,205,30);
}
