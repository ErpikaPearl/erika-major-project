// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player, ground;
let playerspeed = 4;  //  m/s
let playerJumpSpeed = 5;

function setup() {
  new Canvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  world.gravity.y = 9.8;  //  m/s^2

  ground = new Sprite();
  ground.width = windowWidth;
  ground.height = 500;
  ground.y = windowHeight + windowHeight/8;
  ground.color = "black";
  ground.collider = "static";
  ground.friction = 4;

  player = new Sprite();
  player.width = 50;
  player.height = 70;
  player.mass = 0.5;
  player.color = "red";
  player.collider = "dynamic";
  player.rotationLock = true;
  
}

function draw() {
  clear();
  detectPlayerImput();
}

function keyPressed(){
  if (player.colliding(ground)){
    player.drag = 0;
    if (keyCode === 32){
      player.bearing = -90;
      player.applyForce(150);
      console.log("do");
    }
  }
  else if (keyCode === 65 || keyIsDown(LEFT_ARROW) || keyIsDown(68) || keyIsDown(RIGHT_ARROW)){
    player.drag = 4;
  }
  else{
    player.drag = 0;
  }
}

function detectPlayerImput(){
  //  Player Movements
  
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)){  //  A (LEFT)
    player.bearing = 180;
    player.applyForce(15);
    
  }
  else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)){  // D (RIGHT)
    player.bearing = 0;
    player.applyForce(15);
  }
}