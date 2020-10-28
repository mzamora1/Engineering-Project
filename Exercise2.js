let userInput, nukeAnimation, spinnyAnimation, bg, startButton; //GUI variables
let startSound, failSound; //sound variables
let randomPrompt, errors=0, gameState; //game variables
let promptList = ["pirate", "cannonball", "ship", "rum", "caribbean" ]; //array storing all prompts
let usedPromptList = []; //array that will store used prompts
let vec = []; //array that will store vectorHelpers 
let funFactor = 1200; //how much fun you wanna have? too much fun can crash the game

class vectorHelper{ //makes moving objects easier by handling all vector math
  constructor(){
    this.position = createVector(width/2, height/2); //starting position is center top of canvas
    this.velocity = p5.Vector.random2D(); //calculate random inital starting velocity
    this.velocity.mult(3); 
  }
  calculateXY(){ //calculate the new position after moving in the direction of the random vector
    this.position.add(this.velocity); //move the object by vector
    if(this.position.x >= width-5 || this.position.x <= 5 || this.position.y >= height-5 || this.position.y <= 5){
      this.velocity = p5.Vector.random2D();
      this.velocity.mult(3.5);
    }
  }
}

function choosePrompt(){ //chooses a random prompt that has not been used yet
  randomPrompt = random(promptList);
  if(usedPromptList.length >= promptList.length){ //if all prompts have been completed, celebrate!
    nukeAnimation.stop();
    gameState = "celebrate";
    randomPrompt = "";
  }else if(usedPromptList.includes(randomPrompt)){
    choosePrompt();
  }else{
    usedPromptList.push(randomPrompt); 
  }
}

function checkInput(){ //compares last key pressed by user to the next character of the prompt
  let i = this.value();
  let lastInput = i[i.length - 1];
  console.log(lastInput);

  let lastPrompt = randomPrompt[0];
  if(lastInput == lastPrompt){//if user typed correct character, delete first character of current prompt 
    randomPrompt = randomPrompt.substring(1);
  }else{ //else clear input field, reset current prompt, and play fail sound
    userInput.value("");
    randomPrompt = usedPromptList[usedPromptList.length-1];
    if(failSound.isPlaying() == false){
      failSound.play();
      errors++;
    }
  }

  //if word is typed correctly then clear input field and choose a new prompt
  if(randomPrompt.length == 0 && lastInput == lastPrompt){ 
    console.log("word typed");
    choosePrompt();
    userInput.value("");
  }
}

function preload(){
  nukeAnimation = loadAnimation('assets/nukeAnimation/001.png', 'assets/nukeAnimation/167.png');
  spinnyAnimation = loadAnimation('assets/spinnyAnimation/00.png', 'assets/spinnyAnimation/12.png');
  startSound = loadSound("assets/sounds/flying-dutchman.mp3");
  failSound = loadSound("assets/sounds/scallywags.mp3");
  bg = loadImage("assets/pics/background.jpg");
}

function setup() {
  frameRate(60);
  createCanvas(400, 350);
  textSize(20);
  textAlign(CENTER,TOP);
  randomPrompt = random(promptList);
  usedPromptList.push(randomPrompt);

  userInput = createInput('type here');
  userInput.mouseClicked(() => { //clear input field when clicked
    userInput.value("");
  });

  userInput.mouseOver(() => { //bold text in the input field when mouse hovers over it
    userInput.style("font-weight: bold");
  });

  userInput.mouseOut(() => { //remove bold text when mouse is no longer over the input field
    userInput.style("font-weight: normal");
  });
  userInput.input(checkInput); //everytime input is detected, checkInput is called

  startButton = createButton("Start Game");
  startButton.mouseClicked(() => { //start the game and hide the button
    gameState = "playing";
    startButton.hide();
    startSound.play(); //tis i, the flying dutchman
  });

  for(var i = 0; i < funFactor; i++){ //fills array vec with vectorHelpers to be used for moving objects
    vec.push(new vectorHelper());
  }
}

function draw() {
  switch(gameState){
    default:
    //code for instruction screen
      strokeWeight(10);
      stroke(0);
      fill(255);
      rect(0,0,400,350);
      startButton.position(160,270)
      userInput.position((width/2)-75, height+7);
      noStroke();
      fill(0);
      textSize(40);
      text("Instructions",195,50);
      textSize(20);
      text("Type the words that show up on screen.\nFind out if you are a true homie.",195,150);
      break;

    case "playing":
    //code for playing game
      background(33, 96, 212);
      nukeAnimation.draw(200,150);
      fill(150,150,150);
      rect(50,260,300,50);
      fill(0);
      text(randomPrompt, 5,275,400,200);
      fill(103, 168, 97);
      textSize(30);
      text("Typing with Dead Pirate Jack",5,10,400,200);
      fill(103, 168, 97);
      textSize(20);
      text("Words Typed: "+(usedPromptList.length-1),75,315);
      fill(230, 79, 76);
      text("Errors: "+errors,355,315);
      let badX = map(errors, 0, 3, 0, width);
      let goodX = map(usedPromptList.length-1, 0, promptList.length, 0, width);
      strokeWeight(10);
      stroke(230, 79, 76);
      line(0,337,badX,337); //error bar
      stroke(103, 168, 97);
      line(0,345,goodX,345); //progress bar
      if(goodX >= width){ //if progress bar is full then celebrate!
        usedPromptList.splice(1,usedPromptList.length);
        gameState = "celebrate";
      }
      if(badX >= width){ //if error bar is full then game over loser
        gameState = "game over"
        nukeAnimation.stop();
      }
      break;

    case "celebrate":
    //code for celebration screen
      frameRate(60);
      image(bg,0,0,400,350); 
      for(var i = 0; i < vec.length; i++){
        stroke(floor(random(0,256)), floor(random(0,256)), floor(random(0,256))); 
        fill(floor(random(0,256)), floor(random(0,256)), floor(random(0,256)));
        vec[i].calculateXY(); //calculate the XY coordinates of each vector
        circle(vec[i].position.x, vec[i].position.y, 20); //draw a circle with XY coordinates of each vector
      }
      textSize(50);
      fill(255);
      text("You rock!",200,150);
      break;

    case "game over":  
    //code for lose screen
      background(0);
      spinnyAnimation.draw(200,150,x);
      fill(255);
      textSize(35);
      text("You Lose",200,295);
      x++;
  }
}
let x=0;