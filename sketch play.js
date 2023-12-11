// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player, ground, dots, testOB;
let solidsGroup;

let playerMaxSpeed = 10;

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
  testOB.color = "black"
  testOB.x = width/2;
  testOB.y = height - height/5;

  dots = new Group();
	dots.color = 'yellow';
	dots.y = ground.y;
	dots.diameter = 10;
  dots.collider = "static"
	
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
  if (player.colliding(ground) || player.colliding(testOB)){  //  Jump only when touching ground
    if (keyCode === 32){
      player.applyForceScaled(0, -400);
    }
  }

  // //  Camera Movements
  // else if (keyCode === 87 || keyCode === 38){  // W (UP)
  //   let timeInitial = millis();
  //   let waitTime = 1000;
    
  //   if ((keyIsDown(87) || keyIsDown(UP_ARROW)) && player.vel === 0){  // W (UP)
  //     console.log(camera.x)
  //     if (timeInitial < waitTime + millis()){
  //       for (let x = camera.x; x <= camera.x + cameraMovement; x++)
  //       camera.x ++;
        
  //     }
  //   }
  // }
}

function detectPlayerImput(){
  //  Player Movements
  if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && player.vel.x >= -playerMaxSpeed){  //  A (LEFT)
    if (player.colliding(ground) || player.colliding(testOB)){
      player.applyForceScaled(-50, 0);
    }
    else{
      player.applyForceScaled(-5, 0);
    }
  }
  else if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && player.vel.x <= playerMaxSpeed){  // D (RIGHT)
    if (player.colliding(ground) || player.colliding(testOB)){
      player.applyForceScaled(50, 0);
    }
    else{
      player.applyForceScaled(5, 0);
    }
  }
  //  Slows down player when they stop walking
  else if(player.vel.x > 0){
    player.vel.x --;
    // console.log(player.vel.x);
  }
  else if(player.vel.x < 0){
    player.vel.x ++;
    // console.log(player.vel.x);
  }
}