// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player, ground;

function setup() {
  new Canvas(windowWidth, windowHeight);
  world.gravity.y = 9.8;

  ground = new Sprite();
  ground.width = windowWidth;
  ground.height = 500;
  ground.y = windowHeight + windowHeight/8;
  ground.color = "black";
  ground.collider = "static";

  player = new Sprite();
  player.width = 50;
  player.height = 70;
  player.color = "red";
  player.collider = "dynamic";
}

function draw() {
  clear();
}