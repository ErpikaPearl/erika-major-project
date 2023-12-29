// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//  Declaring Variables

//  Declaring sprites, assets and groups
let player, ground, dots, testOB, orgin, HUDFuel;
let lvlOneBackground, levelOne;
let cantPass;
let solidsGroup = [];
let footStep0, footStep1, jump, jetPack0, wind;
//  Declaring player variables
let playerMaxSpeed = 10;
let doubleJump = false;
let dash = true;
let lastSwitchedDash = 0;
let lastSwitchedWalk = 0;
let isOnGround = false;
//  Declaring world and camera variables
let cameraMovement = 50;
let wallWidth = 50;
let level = "One";

function preload(){
  footStep0 = loadSound("Assets/footstep00.ogg");
  footStep1 = loadSound("Assets/footstep01.ogg");
  jump = loadSound("Assets/jump.wav");
  jetPack0 = loadSound("Assets/jetpack0.wav");
  wind = loadSound("Assets/wind.wav");

  footStep0.setVolume(0.1);
  footStep1.setVolume(0.08);
  jump.setVolume(1);
  jetPack0.setVolume(0.2);
  wind.setVolume(1);
}

function setup() {
  //  Set up world
  new Canvas(1278, 710);
  angleMode(DEGREES);
  rectMode(CENTER);
  world.gravity.y = 9.8;
  camera.zoom = 0.9;
  // camera.zoom = 0.1;

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

  //  Create platforms
  let lvlOnePlaformFirst = new levelOne.Sprite();
  lvlOnePlaformFirst.x = lvlOneBackground.x + wallWidth*66;
  lvlOnePlaformFirst.y = lvlOneFloorBottom.y - wallWidth*3;
  lvlOnePlaformFirst.width = wallWidth*3;
  lvlOnePlaformFirst.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFirst);

  let lvlOnePlaformThirdLeft = new levelOne.Sprite();
  lvlOnePlaformThirdLeft.x = lvlOneBackground.x - wallWidth*25;
  lvlOnePlaformThirdLeft.y = lvlOneFloorSecond.y - wallWidth*4;
  lvlOnePlaformThirdLeft.width = wallWidth*35;
  lvlOnePlaformThirdLeft.height = wallWidth;
  solidsGroup.push(lvlOnePlaformThirdLeft);
  let lvlOnePlaformThirdMiddle = new levelOne.Sprite();
  lvlOnePlaformThirdMiddle.x = lvlOneBackground.x + wallWidth*54;
  lvlOnePlaformThirdMiddle.y = lvlOneFloorSecond.y - wallWidth*4;
  lvlOnePlaformThirdMiddle.width = wallWidth*8;
  lvlOnePlaformThirdMiddle.height = wallWidth;
  solidsGroup.push(lvlOnePlaformThirdMiddle);
  let lvlOnePlaformThirdRight = new levelOne.Sprite();
  lvlOnePlaformThirdRight.x = lvlOneBackground.x + wallWidth*56;
  lvlOnePlaformThirdRight.y = lvlOneFloorSecond.y - wallWidth*7;
  lvlOnePlaformThirdRight.width = wallWidth*4;
  lvlOnePlaformThirdRight.height = wallWidth;
  solidsGroup.push(lvlOnePlaformThirdRight);

  let lvlOnePlaformFourth = new levelOne.Sprite();
  lvlOnePlaformFourth.x = lvlOneBackground.x - wallWidth*56;
  lvlOnePlaformFourth.y = lvlOneFloorThirdLeft.y - wallWidth*4;
  lvlOnePlaformFourth.width = wallWidth*4;
  lvlOnePlaformFourth.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFourth);

  let lvlOnePlaformFifthMiddle = new levelOne.Sprite();
  lvlOnePlaformFifthMiddle.x = lvlOneBackground.x;
  lvlOnePlaformFifthMiddle.y = lvlOneFloorFourthRight.y - wallWidth*8;
  lvlOnePlaformFifthMiddle.width = wallWidth*8;
  lvlOnePlaformFifthMiddle.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFifthMiddle);
  let lvlOnePlaformFifthLeft = new levelOne.Sprite();
  lvlOnePlaformFifthLeft.x = lvlOneBackground.x - wallWidth*8;
  lvlOnePlaformFifthLeft.y = lvlOneFloorFourthRight.y - wallWidth*5;
  lvlOnePlaformFifthLeft.width = wallWidth*5;
  lvlOnePlaformFifthLeft.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFifthLeft);
  let lvlOnePlaformFifthRight = new levelOne.Sprite();
  lvlOnePlaformFifthRight.x = -(lvlOnePlaformFifthLeft.x);
  lvlOnePlaformFifthRight.y = lvlOneFloorFourthRight.y - wallWidth*5;
  lvlOnePlaformFifthRight.width = wallWidth*5;
  lvlOnePlaformFifthRight.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFifthRight);
  let lvlOnePlaformFifthRightmost0 = new levelOne.Sprite();
  lvlOnePlaformFifthRightmost0.x = lvlOneBackground.x + wallWidth*42;
  lvlOnePlaformFifthRightmost0.y = lvlOneFloorFourthRight.y - wallWidth*6;
  lvlOnePlaformFifthRightmost0.width = wallWidth*41;
  lvlOnePlaformFifthRightmost0.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFifthRightmost0);
  let lvlOnePlaformFifthRightmost1 = new levelOne.Sprite();
  lvlOnePlaformFifthRightmost1.x = lvlOneBackground.x + wallWidth*68;
  lvlOnePlaformFifthRightmost1.y = lvlOneFloorFourthRight.y - wallWidth*3;
  lvlOnePlaformFifthRightmost1.width = wallWidth*5;
  lvlOnePlaformFifthRightmost1.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFifthRightmost1);
  let lvlOnePlaformFifthLeftmost = new levelOne.Sprite();
  lvlOnePlaformFifthLeftmost.x = lvlOneBackground.x - wallWidth*65;
  lvlOnePlaformFifthLeftmost.y = lvlOneFloorFourthRight.y - wallWidth*4;
  lvlOnePlaformFifthLeftmost.width = wallWidth*4;
  lvlOnePlaformFifthLeftmost.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFifthLeftmost);

  //   Create secondary walls
  let lvlOneWallFirst0 = new levelOne.Sprite();
  lvlOneWallFirst0.x = lvlOneBackground.x - wallWidth*60;
  lvlOneWallFirst0.y = (lvlOneFloorBottom.y + lvlOneFloorFirstLeft.y)/2 - wallWidth*1;
  lvlOneWallFirst0.width = wallWidth;
  lvlOneWallFirst0.height = wallWidth*3;
  let lvlOneWallFirst1 = new levelOne.Sprite();
  lvlOneWallFirst1.x = lvlOneWallFirst0.x + wallWidth*15;
  lvlOneWallFirst1.y = lvlOneWallFirst0.y;
  lvlOneWallFirst1.width = wallWidth;
  lvlOneWallFirst1.height = lvlOneWallFirst0.height;
  let lvlOneWallFirst2 = new levelOne.Sprite();
  lvlOneWallFirst2.x = lvlOneWallFirst0.x + wallWidth*55;
  lvlOneWallFirst2.y = lvlOneWallFirst0.y;
  lvlOneWallFirst2.width = wallWidth;
  lvlOneWallFirst2.height = lvlOneWallFirst0.height;
  let lvlOneWallFirst3 = new levelOne.Sprite();
  lvlOneWallFirst3.x = lvlOneBackground.x + wallWidth*45;
  lvlOneWallFirst3.y = lvlOneWallFirst0.y;
  lvlOneWallFirst3.width = wallWidth;
  lvlOneWallFirst3.height = lvlOneWallFirst0.height;

  let lvlOneWallSecond0 = new levelOne.Sprite();
  lvlOneWallSecond0.x = lvlOneBackground.x - wallWidth*40;
  lvlOneWallSecond0.y = (lvlOneFloorFirstLeft.y + lvlOneFloorSecond.y)/2 - wallWidth*1;
  lvlOneWallSecond0.width = wallWidth;
  lvlOneWallSecond0.height = wallWidth*2;
  let lvlOneWallSecond1 = new levelOne.Sprite();
  lvlOneWallSecond1.x =  lvlOneWallSecond0.x + wallWidth*30;
  lvlOneWallSecond1.y = lvlOneWallSecond0.y;
  lvlOneWallSecond1.width = wallWidth;
  lvlOneWallSecond1.height = wallWidth*2;
  let lvlOneWallSecond2 = new levelOne.Sprite();
  lvlOneWallSecond2.x =  lvlOneWallSecond0.x + wallWidth*70;
  lvlOneWallSecond2.y = lvlOneWallSecond0.y;
  lvlOneWallSecond2.width = wallWidth;
  lvlOneWallSecond2.height = wallWidth*2;

  let lvlOneWallThird0 = new levelOne.Sprite();
  lvlOneWallThird0.x = lvlOneBackground.x - wallWidth*25;
  lvlOneWallThird0.y = (lvlOneFloorSecond.y + lvlOneFloorThirdLeft.y)/2 - wallWidth*2;
  lvlOneWallThird0.width = wallWidth;
  lvlOneWallThird0.height = wallWidth*5;
  let lvlOneWallThird1 = new levelOne.Sprite();
  lvlOneWallThird1.x = lvlOneBackground.x + wallWidth*58;
  lvlOneWallThird1.y = lvlOneWallThird0.y;
  lvlOneWallThird1.width = wallWidth;
  lvlOneWallThird1.height = wallWidth*7;

  let lvlOneWallFourth0 = new levelOne.Sprite();
  lvlOneWallFourth0.x = lvlOneBackground.x - wallWidth*58;
  lvlOneWallFourth0.y = (lvlOneFloorThirdLeft.y + lvlOneFloorFourthLeft.y)/2 - wallWidth*2;
  lvlOneWallFourth0.width = wallWidth;
  lvlOneWallFourth0.height = wallWidth*3;
  let lvlOneWallFourth1 = new levelOne.Sprite();
  lvlOneWallFourth1.x = lvlOneBackground.x - wallWidth*20;
  lvlOneWallFourth1.y = (lvlOneFloorThirdLeft.y + lvlOneFloorFourthLeft.y)/2 - wallWidth*1;
  lvlOneWallFourth1.width = wallWidth;
  lvlOneWallFourth1.height =lvlOneWallFourth0.height;
  let lvlOneWallFourth2 = new levelOne.Sprite();
  lvlOneWallFourth2.x = lvlOneBackground.x + wallWidth*20;
  lvlOneWallFourth2.y = (lvlOneFloorThirdLeft.y + lvlOneFloorFourthLeft.y)/2 - wallWidth*1;
  lvlOneWallFourth2.width = wallWidth;
  lvlOneWallFourth2.height = lvlOneWallFourth0.height;

  let lvlOneWallFifth0 = new levelOne.Sprite();
  lvlOneWallFifth0.x = lvlOneBackground.x - wallWidth*63;
  lvlOneWallFifth0.y = (lvlOneFloorFourthLeft.y + lvlOneFloorFifthLeft.y)/2 - wallWidth*1;
  lvlOneWallFifth0.width = wallWidth;
  lvlOneWallFifth0.height = wallWidth*10;
  let lvlOneWallFifth1 = new levelOne.Sprite();
  lvlOneWallFifth1.x = lvlOneBackground.x + wallWidth*22;
  lvlOneWallFifth1.y = lvlOneWallFifth0.y; 
  lvlOneWallFifth1.width = wallWidth;
  lvlOneWallFifth1.height = wallWidth*10;

  player.y = -lvlOneBackground.height/2 - wallWidth*1.5;
  player.x = lvlOneBackground.width/2 - wallWidth*5;
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

function mousePressed(){
  if(!wind.isPlaying() && level === "One"){
    wind.loop();
  }
}

function keyPressed(){
  //  Player Movements
  if (keyCode === 32){  //  (SPACE) Jump
    if (isOnGround){
      jump.play();
      player.applyForceScaled(0, -400);      
    }
    else if (doubleJump && !isOnGround){
      jetPack0.play();
      player.applyForceScaled(0, -300);
      doubleJump = false;
    }
  }
  
  if (keyCode === 16 && dash){  //  (SHIFT) Dash in the direction player is facing
    let waitTime = 1000;
    
    if (millis() > waitTime + lastSwitchedDash){
      jetPack0.play();
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
      walkSound();
    }
    else{
      player.applyForceScaled(-5, 0);
    }
  }
  else if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && player.vel.x <= playerMaxSpeed){  // D (RIGHT)
    player.bearing = 360;
    if (isOnGround){
      player.applyForceScaled(50, 0);
      walkSound();
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
  // if (player.y >= 0){
  //   wind.setVolume(1);
  //   console.log("wind");
  // }
}

function walkSound(){
  let played = 0;
  if (played === 0 && !footStep0.isPlaying()){
    footStep0.play();
    played ++;
    if (played === 1 && !footStep1.isPlaying()){
      footStep1.play();
      played ++;
    }
  }
}



// function coolDown(waitTime, lastSwitched, ability){
//   if (millis() > waitTime + lastSwitched){
//     ability = !ability;
//     lastSwitched = millis();
//   }
// }