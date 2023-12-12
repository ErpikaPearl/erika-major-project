// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player, ground, dots, testOB;
let solidsGroup = [];

let playerMaxSpeed = 10;
let doubleJump = true;
let isOnGround = true;

let cameraMovement = 50;

function setup() {
  new Canvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  world.gravity.y = 9.8;  //  m/s^2

  ground = new Sprite();
  ground.width = windowWidth*30;
  ground.height = 500;
  ground.y = windowHeight + windowHeight/8;
  ground.x = 0;
  ground.color = "black";
  ground.collider = "static";
  ground.friction = 4;
  ground.bounciness = 0;

  player = new Sprite();
  player.width = 50;
  player.height = 80;
  player.mass = 70;
  player.color = "red";
  player.collider = "dynamic";
  player.rotationLock = true;
  player.bounciness = 0;

  testOB= new Sprite();
  testOB.width = 100;
  testOB.height = 120;
  testOB.collider = "static";
  testOB.color = "black";
  testOB.x = width/2;
  testOB.y = height - height/5;

  dots = new Group();
  dots.color = "yellow";
  dots.y = ground.y;
  dots.diameter = 10;
  dots.collider = "static";

  solidsGroup.push(ground);
  solidsGroup.push(testOB);
	
  while (dots.length <=  ground.width/200) {
    let dotThing = new dots.Sprite();
    dotThing.x = dots.length * 200;
  }

}

function draw() {
  clear();
  detectPlayerImput();
  
  camera.x = player.x;
  camera.y = player.y; 
}

function keyPressed(){
  //  Player Movements
  if (keyCode === 32){  //  (SPACE) Jump
    for (let i = 0; i < solidsGroup.length; i++){
      if (player.colliding(solidsGroup[i])){
        player.applyForceScaled(0, -400);
      }
      else if (doubleJump === true){
        player.applyForceScaled(0, -300);
        doubleJump = false;
      }
    }
  }
  
  if (keyCode === 16){  //  (SHIFT) Dash in the direction player is facing
    let timeInitial = 0;
    let waitTime = 4000;
    if (millis() > waitTime + timeInitial){
      if (player.bearing === 360){
        player.applyForceScaled(800, 0);
      }
      else if (player.bearing === 180){
        player.applyForceScaled(-800, 0);
      }
      timeInitial = millis();
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
  //  Player Movements
  if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && player.vel.x >= -playerMaxSpeed){  //  A (LEFT)
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
  else if(player.vel.x > 0){
    player.vel.x --;
  }
  else if(player.vel.x < 0){
    player.vel.x ++;
  }
}

function managePlayerStates(){
  for (let i = 0; i < solidsGroup.length; i++){
    if (player.colliding(solidsGroup[i])){  //  If touching any solid object
      isOnGround = true;
      doubleJump = true;
    }
  }

  if (player.vel.x < 0){  //  If moving left
    player.bearing = 360;
  }
  else if (player.vel.x > 0){  //  If moving right
    player.bearing = 180;
  }
}