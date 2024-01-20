let objectOne, objectTwo
let theyCollide = 0;
let stopit = true;
let increase = 20;

function setup() {
  new Canvas(1000, 1000);
  angleMode(DEGREES);
  rectMode(CENTER);
  world.gravity.y = 0;
  allSprites.autoCull = false;  //  Prevents sprites from dissapearing when too far away from the camera
  camera.zoom = 0.9;
  // camera.zoom = 0.1;

 objectOne = new Sprite();
 objectOne.mass = 50;
 objectOne.x = canvas.w/4;
 objectOne.y = canvas.h/2 + 110;
 objectOne.color = "red";
 objectOne.collider = "d";

 objectTwo = new Sprite();
 objectTwo.mass = 80;
 objectTwo.x = canvas.w - canvas.w/4;
 objectTwo.y = canvas.h/2 + 110;
 objectTwo.color = "blue";
 objectTwo.collider = "d";
}

function draw() {
  clear();
  if (theyCollide === 0){
    objectOne.applyForceScaled(40*increase, 30*increase);
    objectTwo.applyForceScaled(-20*increase, 30*increase);
    theyCollide = 1;
  }
 else if(theyCollide === 1){
    console.log(objectOne.mass, objectOne.vel.x, objectOne.vel.y);
    console.log(objectTwo.mass, objectTwo.vel.x, objectTwo.vel.y);
    console.log("BREAK");
    theyCollide ++;
  }
  if (objectOne.collided(objectTwo) && stopit){
    console.log(objectOne.mass, objectOne.vel.x, objectOne.vel.y);
    console.log(objectTwo.mass, objectTwo.vel.x, objectTwo.vel.y);
    stopit = false;
  }
}


