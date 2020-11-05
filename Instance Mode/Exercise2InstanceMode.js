class Exercise2{
    constructor(){
        class circleMover{ //makes moving objects easier by handling all vector math
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

        const sketch = function(p){
            p.userInput, p.nukeAnimation, p.spinnyAnimation, p.eatingAnimation, p.growlingAnimation, p.attackAnimation, p.bg, p.startButton, p.celebrateBtn; //GUI variables
            p.startSound, p.failSound, p.twoPac; //sound variables
            p.randomPrompt, p.errors=0, p.wordsTyped=0, p.wordCount, p.gameState, p.timeToComplete, p.startTime; //game variables
            p.promptList = ["Once upon a time ", ]//"there was a pirate ", "named dp jack ", "he turned into a bomb ", "and now hes dead " ]; //array storing all prompts
            p.circleMovers = []; //array that will store vectorHelpers 
            p.funFactor = 50; //how much fun you wanna have? too much fun can crash the game
            p.storyAnimations = [];
            p.div, p.canvas, p.homeBtn;
            p.loaded = false;
        
            p.calculateWordCount = function(prompts){ //calculates the total number of words in the whole prompt
            let words = 0;
            for(let i = 0; i < prompts.length; i++){
                for(let j = 0; j < prompts[i].length; j++){
                if(prompts[i].substring(j,j+1) == " ") words++;
                }
            }
            return words;
            }
        
            p.subWordsTyped = 0;
            p.firstInput = true;
            p.index = 0;
            p.checkInput = function(){ //compares last key pressed by user to the next character of the prompt
            if(p.firstInput){
                p.firstInput = false; 
                p.startTime = p.millis();
        
            }  
            let lastInput = this.value()[this.value().length - 1];
            let nextLetter = p.randomPrompt[0];
        
            if(lastInput == nextLetter){//if user typed correct character, delete first character of current prompt 
                p.randomPrompt = p.randomPrompt.substring(1);
                if(p.keyIsDown(32)){ //if space is pressed then a word has been typed correctly
                p.wordsTyped++;
                p.subWordsTyped++;
                }
                if(p.randomPrompt.length == 0){ //if sentence is typed correctly then clear input field and go to next sentence
                p.index++;
                p.randomPrompt = p.promptList[p.index];
                if(p.promptList.length == p.index){ //if all sentences have been completed, stop the animation to save resources for the many many balls to come
                    p.nukeAnimation.stop();
                }
                p.subWordsTyped=0;
                p.userInput.value("");
                }
            }
        
            else{ //if wrong input then reset progress bar, prompt, userInput and play the fail sound
                if(!p.failSound.isPlaying()){
                p.failSound.play();
                p.errors++;
                p.wordsTyped= p.wordsTyped - p.subWordsTyped;
                }
                p.userInput.value("");
                p.randomPrompt = p.promptList[p.index];
                p.subWordsTyped = 0;
            }
            }
        
            p.preload = function() {
                console.log("nuke done")
                
                p.nukeAnimation = p.loadAnimation('/Exercise 2/assets/nukeAnimation/001.png', '/Exercise 2/assets/nukeAnimation/167.png');
                p.spinnyAnimation = p.loadAnimation('/Exercise 2/assets/spinnyAnimation/00.png', '/Exercise 2/assets/spinnyAnimation/12.png');
                p.growlingAnimation = p.loadAnimation('/Exercise 2/assets/growlingAnimation/01.png', '/Exercise 2/assets/growlingAnimation/13.png');
                p.eatingAnimation = p.loadAnimation('/Exercise 2/assets/eatingAnimation/01.png', '/Exercise 2/assets/eatingAnimation/22.png');
                p.attackAnimation = p.loadAnimation('/Exercise 2/assets/attackAnimation/001.png', '/Exercise 2/assets/attackAnimation/143.png');
                p.startSound = p.loadSound("/Exercise 2/assets/sounds/flying-dutchman.mp3")
                p.failSound = p.loadSound("/Exercise 2/assets/sounds/scallywags.mp3");
                p.twoPac = p.loadSound("/Exercise 2/assets/sounds/2Pac.mp3", ()=> {p.twoPac.play(); p.twoPac.jump(17); p.loaded = true});
                p.bg = p.loadImage("/Exercise 2/assets/pics/background.jpg");
                p.pinkDutch = p.loadImage("/Exercise 2/assets/pics/Flying dutchman wearing pink dress.png");
            }
        
            p.setup = function() {
                p.preload();
                p.frameRate(60); p.textSize(20); p.textAlign(p.CENTER,p.TOP);
                p.div = p.createElement("div");
                p.canvas = p.createCanvas(400,350, p.P2D);
                p.wordCount = p.calculateWordCount(p.promptList);
                p.userInput = p.createInput('type here');
                p.userInput.mouseClicked(() => { //clear input field when clicked
                    p.userInput.value("");
                });
        
            p.userInput.mouseOver(() => { //bold text in the input field when mouse hovers over it
                p.userInput.style("font-weight: bold");
            });
        
            p.userInput.mouseOut(() => { //remove bold text when mouse is no longer over the input field
                p.userInput.style("font-weight: normal");
            });
            p.userInput.input(p.checkInput); //everytime input is detected, checkInput() is called
        
            p.startButton = p.createButton("Start Game");
            p.startButton.mouseClicked(() => { //start the game and hide the button
                p.gameState = "playing";
                p.startButton.hide();
                console.log(p.startSound)
                p.startSound.play(); //tis i, the flying dutchman
            });
        
            p.celebrateBtn = p.createButton("Click to celebrate!"); //will appear after progress bar has been filled
            p.celebrateBtn.hide();
            p.celebrateBtn.mouseClicked(() => {
                p.celebrateBtn.hide();
                p.gameState = "celebrate";
            });
        
            p.homeBtn = p.createButton("Home");
            p.homeBtn.mouseClicked(() => {
                window.open("homeInstanceMode.html", "_self");
            });

            p.div
                .child(p.canvas)
                .child(p.userInput)
                .child(p.startButton)
                .child(p.celebrateBtn)
                .child(p.homeBtn)
                .center('horizontal');
        
            p.randomPrompt = p.promptList[0];
        
            for(var i = 0; i < p.funFactor; i++){ //fills array circleMovers with circleMovers to be used for moving objects
                p.circleMovers.push(new circleMover(p.width, p.height));
            }
            p.growlingAnimation.frameDelay = 3;
            p.storyAnimations.push(p.eatingAnimation, p.growlingAnimation, p.attackAnimation);
            } 
        
        
        
            p.pic =0;
            p.timeStarted = 0;
            p.timings = [1,1,1,1,1];
            //p.timings = [5,5,10,10,10];
            p.firstTime=true;
        p.isLoaded = function(item){
            
            let animationsAreLoaded = p.nukeAnimation.images.length == 167 && p.eatingAnimation.images.length == 22 && p.growlingAnimation.images.length == 13 && p.attackAnimation.images.length == 143;
            if(item  == "2Pac" && animationsAreLoaded){
                    console.log(p.twoPac)
                    p.twoPac.play();
                    return true;
            }
            else return false;
        }

        p.draw = function() {
        if(p.loaded){
            p.canvas.clear();
            p.div
                .style("left", `${p.floor(window.outerWidth/2-p.width/2)}px`)
                .style("top", "50px");
            switch(p.gameState){
                default:
                p.startButton.hide();
                p.userInput.hide();
                if(p.firstTime){
                    p.firstTime = false;
                }
                if(p.pic==0 && p.pinkDutch){
                    p.image(p.pinkDutch,0,0,400,350);
                }
                else if(p.pic-1 < p.storyAnimations.length && p.storyAnimations[p.pic-1]){
                    p.storyAnimations[p.pic-1].draw(200,150);
                }
                else{
                    p.twoPac.stop();
                    p.startButton.show();
                    p.userInput.show();
                    p.gameState="instructions";
                }
                if((p.millis()-p.timeStarted)>(p.timings[p.pic]*1000)){
                    p.pic++;
                    p.timeStarted = p.millis();
                }
                break;
        
                case "instructions":
                //code for instruction screen
                p.firstTime = true;
                p.strokeWeight(10); p.stroke(0); p.fill(255);
                p.rect(0,0,400,350);
                p.startButton.position(160,270);
                p.userInput.position((p.width/2)-75, p.height+7);
                p.noStroke(); p.fill(0); p.textSize(40);
                p.text("Instructions",200,50);
                p.textSize(20);
                p.text("Type the words that show up on screen.\n"+
                    "Press space whenever the prompt is blank\n"+
                    "Find out if you are a true homie.",200,150);
                break;
        
                case "playing":
                //code for playing game
                p.background(33, 96, 212);
                p.nukeAnimation.draw(200,150);
                p.fill(150,150,150);
                p.rect(50,260,300,50);
                p.fill(0); p.textSize(30);
                p.text(p.randomPrompt, 5,275,400,200);
                p.fill(103, 168, 97); p.textSize(30);
                p.text("Typing with Dead Pirate Jack",5,10,400,200);
                p.fill(103, 168, 97); p.textSize(20);
                p.text("Words Typed: "+ p.wordsTyped,75,315);
                p.fill(230, 79, 76);
                p.text("Errors: "+ p.errors,355,315);
                let badX = p.map(p.errors, 0, 5, 0, p.width); 
                let goodX = p.map(p.wordsTyped, 0, p.wordCount, 0, p.width); 
                p.stroke(230, 79, 76); p.strokeWeight(10); 
                p.line(0, 337, badX,337); //error bar
                p.stroke(103, 168, 97);
                p.line(0, 345, goodX,345); //progress bar
                if(goodX >= p.width){ //if progress bar is full then get ready to celebrate 
                    p.celebrateBtn.show();
                    p.celebrateBtn.position(140, 80);
                    p.userInput.hide();
                    p.image(p.bg,0,0,400,350);
                    if(p.firstTime){
                        p.firstTime = false;
                        p.timeToComplete = (p.millis()-p.startTime)/1000;
                    }
                    p.fill(255); p.noStroke();
                    p.text("You completed all prompts in "+ p.timeToComplete.toFixed(2) + " seconds", 200,200);
                }
                else if(badX >= p.width){ //if error bar is full then game over loser
                    p.gameState = "game over"
                    p.nukeAnimation.stop();
                }
                break;
        
                case "celebrate":
                //code for celebration screen
                p.userInput.show();
                p.userInput.value("Click the circles!");
                p.userInput.style("font-weight: bold");
                p.image(p.bg,0,0,400,350);
                for(var i = 0; i < p.circleMovers.length; i++){
                    let mouseIsOverCircle = p.dist(p.mouseX, p.mouseY, p.circleMovers[i].position.x, p.circleMovers[i].position.y) < p.circleMovers[i].size;
                    if(mouseIsOverCircle){ //then stop that circle and change color
                    p.circleMovers[i].velocity = 0;
                    p.circleMovers[i].color.r = p.floor(p.random(0,256));
                    p.circleMovers[i].color.b = p.floor(p.random(0,256));
                    p.circleMovers[i].color.g = p.floor(p.random(0,256));
                    }else{
                    p.circleMovers[i].velocity = p.circleMovers[i].startingVelocity;
                    }
                    p.fill(p.circleMovers[i].color.r, p.circleMovers[i].color.g, p.circleMovers[i].color.b);
                    p.circleMovers[i].updatePosition(); //calculate the XY coordinates of each vector
                    p.circle(p.circleMovers[i].position.x, p.circleMovers[i].position.y, p.circleMovers[i].size); //draw a circle with XY coordinates of each vector
                }
                p.textSize(50); p.fill(255);
                p.text("You rock!",200,150);
                break;
        
                case "game over":  
                //code for lose screen
                p.background(0);
                p.fill(255); p.textSize(35);
                p.text("You Lose",200,295);
                p.userInput.hide();
                spinnyAnimation.draw(200,150,p.x);
                p.x++;
            }
            }
            p.x=0;
        
            p.mouseClicked = function(){
            for(var i = 0; i < p.circleMovers.length; i++){
                let mouseIsOverCircle = p.dist(p.mouseX, p.mouseY, p.circleMovers[i].position.x, p.circleMovers[i].position.y) < p.circleMovers[i].size;
                if(mouseIsOverCircle){ //then make it disappear
                p.circleMovers[i].size = 0;
                p.circleMovers[i].startingVelocity = 0;
                }
            }
            }
        }
        }
        new p5(sketch);
    }
}