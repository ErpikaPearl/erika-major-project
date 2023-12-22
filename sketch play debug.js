// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player, orgin, testOB, leftCantPass, rightCantPass;
let solidsGroup = [];

let playerMaxSpeed = 10;
let doubleJump = false;
let dash = true;
let lastSwitchedDash = 0;
let isOnGround = false;

let cameraMovement = 50;

function setup() {
  new Canvas("1.8 : 1");
  angleMode(DEGREES);
  rectMode(CENTER);
  world.gravity.y = 9.8;  //  m/s^2
  world.setBounds(0, 0, 10000, 10000);
  camera.zoom = 0.09;

  player = new Sprite();
  player.x = 0;
  player.y = -50;
  player.width = 50;
  player.height = 80;
  player.mass = 70;
  player.color = "red";
  player.collider = "dynamic";
  player.rotationLock = true;
  player.bounciness = 0;

  orgin = new Sprite();
  orgin.width = 60000;
  orgin.height = 50;
  orgin.collider = "static";
  orgin.color = "black";
  orgin.x = 0;
  orgin.y = 0;

  leftCantPass = new Sprite();
  leftCantPass.width = 100;
  leftCantPass.height = 10000;
  leftCantPass.x = -5100;
  leftCantPass.y = 0;
  leftCantPass.color = "blue";
  leftCantPass.collider = "static";

  rightCantPass = new Sprite();
  rightCantPass.width = 100;
  rightCantPass.height = 10000;
  rightCantPass.x = 5080;
  rightCantPass.y = 0;
  rightCantPass.color = "blue";
  rightCantPass.collider = "static";

  //  -5320.166666666653 -23.629333333333346 LEFT SIDE
  //  16203.249999999676 -30.796000000000006 RIGHT SIDE


  // testOB= new Sprite();
  // testOB.width = 50;
  // testOB.height = 50;
  // testOB.collider = "static";
  // testOB.color = "blue";
  // testOB.x = -13000;
  // testOB.y = 0;

  // solidsGroup.push(testOB);
  solidsGroup.push(orgin);

}

function draw() {
  clear();
  managePlayerStates();
  detectPlayerImput();

  camera.x = player.x;
  camera.y = player.y; 

  // camera.off();
  // rect(50, 50, 60, 60);
  // rect(120, 50, 40, 40);
  // rect(170, 50, 40, 40);
  // rect(220, 50, 40, 40);
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

  if (keyCode === 78){
    console.log(player.x, player.y);
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