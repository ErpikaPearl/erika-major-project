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

  player = new Sprite();
  player.width = 50;
  player.height = 70;
  player.mass = 200;
  player.color = "red";
  player.collider = "dynamic";
  player.rotationLock = true;

}

function draw() {
  clear();
  detectPlayerImput();
}

function detectPlayerImput(){
  //  Player Movements
  if (player.colliding(ground)){
    if (keyIsDown(32)){  //  SPACE (JUMP)
      player.bearing = -90;
      player.applyForce(6);
    }
  }
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)){  //  A (LEFT)
    player.bearing = 180;
    player.applyForce(6);
  }
  else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)){  // D (RIGHT)
    player.vel.x = playerspeed;
  }
  else{
    player.vel.x = 0;
  }
}

// function keyPressed(){
//   //  Player Movements
//   if (keyCode === 32){  //  SPACE (JUMP)
//     player.vel.y -= playerspeed;
//     console.log("up");
//   }
//   if (keyCode === 65 || keyCode === LEFT_ARROW){  //  A (LEFT)
//     player.vel.x -= playerspeed;
//     console.log("left");
//   }
//   if (keyCode === 68 || keyCode === RIGHT_ARROW){  // D (RIGHT)
//     player.vel.x += playerspeed;
//     console.log("right");
//   }
// }

