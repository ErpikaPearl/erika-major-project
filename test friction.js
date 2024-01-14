let player, base, theHeight, theTop;
let wallWidth = 50;

function setup() {
  new Canvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  world.gravity.y = 9.8;
  allSprites.autoCull = false;  //  Prevents sprites from dissapearing when too far away from the camera
  camera.zoom = 0.9;
  // camera.zoom = 0.1;

  

  // base = new Sprite();
  // base.width = 150;
  // base.height = 20;
  // base.x = 0;
  // base.y = 0;
  // base.color = "grey";

  theTop = new Sprite();
  theTop.width = windowWidth/2;
  theTop.height = 50;
  theTop.color = "brown";
  theTop.collider = "kinematic ";
  theTop.rotation = 0;
  theTop.text = theTop.rotation + "°";
  theTop.bearing = 360 
  theTop.friction = 0;

  //  Set up player
  player = new Sprite();
  player.x = theTop.x - theTop.width/2  - 100;
  player.y = theTop.y - theTop.height/2 - 50;
  player.width = 80;
  player.height = 40;
  player.mass = 100;
  player.color = "red";
  player.collider = "dynamic";
  player.bounciness = 0;
  player.hp = 5;
  player.hpHolder = [];
  player.maxSpeed = 10;
  player.doubleJump = false;
  player.dash = true;
  player.lastSwitchedDash = 0;
  player.isOnGround = false;
  player.wallet = [0, 0];
  player.text = player.mass;
  player.friction = 0;
}

function draw() {
  clear();
  console.log(player.vel.x, player.vel.y)
}

function keyPressed(){
  if (keyCode === 32){
    player.applyForceScaled(400, 0);
  }
}