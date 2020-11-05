class Exercise1{
    constructor(){
        new p5(function(p){
            p.setup = function() {
                p.createCanvas(400, 400);
                p.homeBtn = p.createButton("Home");
                p.homeBtn.mouseClicked(() => {
                    window.open("homeInstanceMode.html", "_self");
                });
            }

            p.draw = function() {
                p.drawBackground();
                let handleX = 123;
                let handleY = 198;
                if(p.mouseIsPressed && p.mouseX>=123 && p.mouseX<=188 && p.mouseY>=198 && p.mouseY<=273){ //if mouse pressed in bounds then rotate handle
                    p.rotateHandle(handleX, handleY);
                }
                else { //just draw rectangle
                    p.fill(255,215,0,1000);
                    p.rect(handleX,handleY,65,17); 
                }   
           }

            p.rotateHandle = function(posX, posY){
                let angle = Math.atan2(p.mouseY-posY, p.mouseX-posX);
                if(angle >= 1.5){
                    console.log("handle turned");
                }   
                p.translate(123,198);
                p.rotate(angle);
                p.fill(255,215,0,1000);
                p.rect(0,0,65,17);
            }

            p.drawBackground = function(){
                p.stroke('black');
                p.background(220);
                p.fill(202,164,114);
                p.rect(100,0,200,400);
                p.stroke('red');
                p.strokeWeight(7);
                p.fill(0,0,0,0);
                p.circle(145,210,120);
                p.stroke('black');
                p.strokeWeight(0.5);
                p.fill('gold');
                p.rect(110,170,30,80,10);
                p.fill('grey');
                p.circle(125,205,30);
            }
        });
    }
}

