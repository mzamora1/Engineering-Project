let positionArray = [];
function setup(){
    createCanvas(400,400);
    for(let i = 0; i < 10; i++){
        positionArray.push({x: 20+i*40, y: 100+i*20}); //fill positionArray will objects holding the x and y coordinates of each dot
        circle(positionArray[i].x, positionArray[i].y, 5);
    }
}

function draw(){
    clear();
    text("screen will clear if mouse is pressed/dragged while not in a boundary", 20,20);
    for(let i = 0; i < positionArray.length; i++){
        circle(positionArray[i].x, positionArray[i].y, 3);
    }
    if(mouseIsPressed){
        checkAllBoundaries(17);
    }
}

function mouseReleased(){
    circle(mouseX, mouseY, 3);
        console.log(mouseX,  mouseY);
}

//clears the screen if mouse is not within any boundaries 
function checkAllBoundaries(size){
    let inAnyBoundary = false;
    for(let i = 0; i < positionArray.length; i++){ //checks all boundaries
        let boundary = {
            left: positionArray[i].x - size,
            right: positionArray[i].x + size,
            top: positionArray[i].y - size,
            bottom: positionArray[i].y + size
        }
        rect(boundary.left, boundary.top, size*2); //for testing purposes
        if(mouseX > boundary.left && mouseX < boundary.right && mouseY < boundary.bottom && mouseY > boundary.top){
           // console.log("you in da boundary foo");
            inAnyBoundary = true;
        }
    }
    if(!inAnyBoundary){ //if not in bounds of any dot then clear the screen
        //console.log("not in bounds");
        clear();
    }
}



