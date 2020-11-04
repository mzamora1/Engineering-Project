function setup() {
  createCanvas(400, 400);
}

let positionArray = [];
  positionArray.push({x: 205, y:56,});
  positionArray.push({x: 178, y:94}); 
  positionArray.push({x: 225, y:95}); 
  positionArray.push({x: 202, y:126}); 
  positionArray.push({x: 166, y:127}); 
  positionArray.push({x: 234, y:126}); 
  positionArray.push({x: 159, y:158}); 
  positionArray.push({x: 246, y:158}); 

let fishArray = [];
  fishArray.push({x: 129, y:109}); 
  fishArray.push({x: 129, y:133}); 
  fishArray.push({x: 129, y:152}); 
  fishArray.push({x: 150, y:145}); 
  fishArray.push({x: 147, y:114}); 
  fishArray.push({x: 163, y:129}); 
  fishArray.push({x: 183, y:110}); 
  fishArray.push({x: 218, y:89}); 
  fishArray.push({x: 266, y:86}); 
  fishArray.push({x: 295, y:104}); 
  fishArray.push({x: 190, y:137}); 
  fishArray.push({x: 226, y:152}); 
  fishArray.push({x: 269, y:150}); 
  fishArray.push({x: 291, y:134}); 

let visitedboundaries = [];

function draw() {

  for(let i = 0; i < positionArray.length; i++){
    circle(positionArray[i].x, positionArray[i].y, 5);
  }
  
    stroke(20);
  if (mouseIsPressed === true) {
    line(mouseX, mouseY, pmouseX, pmouseY);
    checkAllBoundaries(21);
  }

}

function checkAllBoundaries(size){
    let inAnyBoundary = false;
      for(let i = 0; i < positionArray.length; i++){
        let boundary = {
            left: positionArray[i].x - size,
            right: positionArray[i].x + size,
            top: positionArray[i].y - size,
            bottom: positionArray[i].y + size
        }
        //rect(boundary.left, boundary.top, size*2); //for testing purposes
        if(mouseX > boundary.left && mouseX < boundary.right && mouseY < boundary.bottom && mouseY >           boundary.top){
          inAnyBoundary = true;
          if (!visitedboundaries.includes(positionArray[i])){
            visitedboundaries.push(positionArray[i]);
            console.log("hi");
          }
         }
      }
        if (visitedboundaries.length >= positionArray.length){
          positionArray = fishArray;
          console.log("lo hizimos!");
        }
        if(!inAnyBoundary){ 
        console.log("not in bounds");
        clear();
    }
}
