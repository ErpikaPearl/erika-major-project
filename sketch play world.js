// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//  Declaring Variables

//  Declaring sprites and groups
let player, ground, dots, testOB, orgin, HUDFuel;
let lvlOneBackground, levelOne;
let cantPass;
let solidsGroup = [];
//  Declaring player variables
let playerMaxSpeed = 10;
let doubleJump = false;
let dash = true;
let lastSwitchedDash = 0;
let isOnGround = false;
//  Declaring world and camera variables
let cameraMovement = 50;
let wallWidth = 50;

function setup() {
  //  Set up world
  new Canvas(1278, 710);
  angleMode(DEGREES);
  rectMode(CENTER);
  world.gravity.y = 9.8;
  camera.zoom = 0.9;
  camera.zoom = 0.1;

  //  Set up player
  player = new Sprite();
  player.width = 50;
  player.height = 80;
  player.mass = 70;
  player.color = "red";
  player.collider = "dynamic";
  player.rotationLock = true;
  player.bounciness = 0;

  //  Set up HUD
  HUDFuel = new Sprite();
  HUDFuel.x = 50;
  HUDFuel.y = 50;
  HUDFuel.width = 60;
  HUDFuel.height = 60;
  HUDFuel.collider = "none";
  HUDFuel.color = "white"; 

  //  Set up Level one
  //Note to Mr. Schellenberg: The levels are set up by making a sprite for each floor, wall, and platform.
  //This is very inefficient but there is no easier way to do this using p5 Play. I could have used p5 Play's
  //Tiles constructor, but this greatly limits what I would be able to do using the tiles. For example, I 
  //Wouldn't have been able to have the player interact differently will walls and floors.
  levelOne = new Group();
  levelOne.color = "green";
  levelOne.collider = "static";
  levelOne.friction = 4;
  levelOne.bounciness = 0;

  lvlOneBackground = new levelOne.Sprite();
  lvlOneBackground.color = "orange";
  lvlOneBackground.collider = "n";
  lvlOneBackground.x = 0;
  lvlOneBackground.y = 0;
  lvlOneBackground.width = 7000;
  lvlOneBackground.height = 2000;
  lvlOneBase = new levelOne.Sprite();
  lvlOneBase.color = "green";
  lvlOneBase.collider = "n";
  lvlOneBase.x = 0;
  lvlOneBase.y = lvlOneBackground.y + lvlOneBackground.height - 2;
  lvlOneBase.width = lvlOneBackground.width + wallWidth;
  lvlOneBase.height = 2000;

  // ground = new Sprite();
  // ground.width = windowWidth*30;
  // ground.height = 500;
  // ground.y = windowHeight + windowHeight/8 + 600;
  // ground.x = 0;
  // ground.color = "black";
  // ground.collider = "static";
  // ground.friction = 4;
  // ground.bounciness = 0;

  // testOB= new Sprite();
  // testOB.width = 100;
  // testOB.height = 120;
  // testOB.collider = "static";
  // testOB.color = "black";
  // testOB.x = width/2;
  // testOB.y = height - height/5;

  orgin = new Sprite();
  orgin.diameter = 60;
  orgin.x = 0;
  orgin.y = 0;
  orgin.collider = "static";

  // dots = new Group();
  // dots.color = "yellow";
  // dots.y = ground.y;
  // dots.diameter = 10;
  // dots.collider = "static";

  // solidsGroup.push(testOB);
  // solidsGroup.push(ground);
	
  // while (dots.length <=  ground.width/200) {
  //   let dotThing = new dots.Sprite();
  //   dotThing.x = dots.length * 200;
  // }

  
  //  Create walls and floors
  let lvlOneLeftWall = new levelOne.Sprite();
  lvlOneLeftWall.x = lvlOneBackground.x - lvlOneBackground.width/2;
  lvlOneLeftWall.y = lvlOneBackground.y;
  lvlOneLeftWall.width = wallWidth;
  lvlOneLeftWall.height = lvlOneBackground.height;
  // lvlOneLeftWall.visible = false;

  let lvlOneRightWall = new levelOne.Sprite();
  lvlOneRightWall.x = lvlOneBackground.x + lvlOneBackground.width/2;
  lvlOneRightWall.y = lvlOneBackground.y;
  lvlOneRightWall.width = wallWidth;
  lvlOneRightWall.height = lvlOneBackground.height;

  let lvlOneFloorBottom = new levelOne.Sprite();
  lvlOneFloorBottom.x = lvlOneBackground.x;
  lvlOneFloorBottom.y = lvlOneBackground.y + lvlOneBackground.height/2;
  lvlOneFloorBottom.width = lvlOneBackground.width + wallWidth;
  lvlOneFloorBottom.height = wallWidth;
  solidsGroup.push(lvlOneFloorBottom);

  let lvlOneFloorFirstLeft = new levelOne.Sprite();
  lvlOneFloorFirstLeft.x = lvlOneBackground.x - wallWidth*3;
  lvlOneFloorFirstLeft.y = lvlOneFloorBottom.y - wallWidth*6;
  lvlOneFloorFirstLeft.width = lvlOneBackground.width - wallWidth*6;
  lvlOneFloorFirstLeft.height = wallWidth;
  solidsGroup.push(lvlOneFloorFirstLeft);
  let lvlOneFloorFirstRight = new levelOne.Sprite();
  lvlOneFloorFirstRight.x = lvlOneBackground.x + lvlOneBackground.width/2 - wallWidth;
  lvlOneFloorFirstRight.y = lvlOneFloorFirstLeft.y;
  lvlOneFloorFirstRight.width = lvlOneBackground.width - lvlOneFloorFirstLeft.width - wallWidth*3;
  lvlOneFloorFirstRight.height = wallWidth;
  solidsGroup.push(lvlOneFloorFirstRight);

  let lvlOneFloorSecond = new levelOne.Sprite();
  lvlOneFloorSecond.x = lvlOneBackground.x + wallWidth*3;
  lvlOneFloorSecond.y = lvlOneFloorFirstLeft.y - wallWidth*5;
  lvlOneFloorSecond.width = lvlOneBackground.width - wallWidth*5;
  lvlOneFloorSecond.height = wallWidth;
  solidsGroup.push(lvlOneFloorSecond);

  let lvlOneFloorThirdLeft = new levelOne.Sprite();
  lvlOneFloorThirdLeft.x = lvlOneBackground.x - wallWidth*10;
  lvlOneFloorThirdLeft.y = lvlOneFloorSecond.y - wallWidth*10;
  lvlOneFloorThirdLeft.width = lvlOneBackground.width - wallWidth*20;
  lvlOneFloorThirdLeft.height = wallWidth;
  solidsGroup.push(lvlOneFloorThirdLeft);
  let lvlOneFloorThirdRight = new levelOne.Sprite();
  lvlOneFloorThirdRight.x = lvlOneBackground.x + wallWidth*64;
  lvlOneFloorThirdRight.y = lvlOneFloorThirdLeft.y;
  lvlOneFloorThirdRight.width = lvlOneBackground.width/8 - wallWidth*5;
  lvlOneFloorThirdRight.height = wallWidth;
  solidsGroup.push(lvlOneFloorThirdRight);

  let lvlOneFloorFourthRight = new levelOne.Sprite();
  lvlOneFloorFourthRight.x = -(lvlOneBackground.x - wallWidth*10);
  lvlOneFloorFourthRight.y = lvlOneFloorThirdLeft.y - wallWidth*6;
  lvlOneFloorFourthRight.width = lvlOneBackground.width - wallWidth*20;
  lvlOneFloorFourthRight.height = wallWidth;
  solidsGroup.push(lvlOneFloorFourthRight);
  let lvlOneFloorFourthLeft = new levelOne.Sprite();
  lvlOneFloorFourthLeft.x = -(lvlOneBackground.x + wallWidth*64);
  lvlOneFloorFourthLeft.y = lvlOneFloorFourthRight.y;
  lvlOneFloorFourthLeft.width = lvlOneBackground.width/8 - wallWidth*5;
  lvlOneFloorFourthLeft.height = wallWidth;
  solidsGroup.push(lvlOneFloorFourthLeft);

  let lvlOneFloorFifthLeft = new levelOne.Sprite();
  lvlOneFloorFifthLeft.x = lvlOneBackground.x - lvlOneBackground.width/4 - wallWidth*4;
  lvlOneFloorFifthLeft.y = lvlOneBackground.y - lvlOneBackground.height/2;
  lvlOneFloorFifthLeft.width = lvlOneBackground.width/2 - wallWidth*7;
  lvlOneFloorFifthLeft.height = wallWidth;
  solidsGroup.push(lvlOneFloorFifthLeft);
  let lvlOneFloorFifthRight = new levelOne.Sprite();
  lvlOneFloorFifthRight.x = -(lvlOneFloorFifthLeft.x);
  lvlOneFloorFifthRight.y = lvlOneBackground.y - lvlOneBackground.height/2;
  lvlOneFloorFifthRight.width = lvlOneFloorFifthLeft.width;
  lvlOneFloorFifthRight.height = wallWidth;
  solidsGroup.push(lvlOneFloorFifthRight);

  //  Create platforms and secondary walls
}

function draw() {
  clear();
  camera.on();

  managePlayerStates();
  detectPlayerImput();

  noStroke();
  lvlOneBackground.draw();
  levelOne.draw();

  camera.x = player.x;
  camera.y = player.y; 

  camera.off();
  HUDFuel.draw();
}

function keyPressed(){
  //  Player Movements
  if (keyCode === 32){  //  (SPACE) Jump
    if (isOnGround){
      player.applyForceScaled(0, -400);
      
    }
    else if (doubleJump && !isOnGround){
      player.applyForceScaled(0, -300);
      doubleJump = false;
    }
  }
  
  if (keyCode === 16 && dash){  //  (SHIFT) Dash in the direction player is facing
    let waitTime = 1000;
    
    if (millis() > waitTime + lastSwitchedDash){
      if (player.bearing === 360){
        player.applyForceScaled(800, 0);
      }
      else if (player.bearing === 180){
        player.applyForceScaled(-800, 0);
      }
      lastSwitchedDash = millis();
    }
  }

  // //  Camera Movements
  // else if (keyCode === 87 || keyCode === 38){  // W (UP)
  //   let timeInitial = millis();
  //   let waitTime = 1000;
  //   if ((keyIsDown(87) || keyIsDown(UP_ARROW)) && player.vel === 0){  // W (UP)
  //     console.log(camera.x);
  //     if (timeInitial < waitTime + millis()){
  //       for (let x = camera.x; x <= camera.x + cameraMovement; x++) {
  //         camera.x ++;
  //       }
  //     }
  //   }
  // }
}

function detectPlayerImput(){
  // console.log(isOnGround);
  //  Player Movements
  if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && player.vel.x >= -playerMaxSpeed){  //  A (LEFT)
    player.bearing = 180;
    if (isOnGround){
      player.applyForceScaled(-50, 0);
    }
    else{
      player.applyForceScaled(-5, 0);
    }
  }
  else if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && player.vel.x <= playerMaxSpeed){  // D (RIGHT)
    player.bearing = 360;
    if (isOnGround){
      player.applyForceScaled(50, 0);
    }
    else{
      player.applyForceScaled(5, 0);
    }
  }
  //  Slows down player when they stop walking
  else if(player.vel.x > 0 && player.bearing === 360 && isOnGround){
    player.vel.x --;
  }
  else if(player.vel.x < 0 && player.bearing === 180 && isOnGround){
    player.vel.x ++;
  }
}

function managePlayerStates(){
  isOnGround = false;
  for (let i = 0; i < solidsGroup.length; i++){
    if (player.colliding(solidsGroup[i])){  //  If touching any solid object
      doubleJump = true;
      isOnGround = true;
    }
  }
}

function coolDown(waitTime, lastSwitched, ability){
  if (millis() > waitTime + lastSwitched){
    ability = !ability;
    lastSwitched = millis();
  }
}