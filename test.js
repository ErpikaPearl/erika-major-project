let drone, floor;

function setup() {
  new Canvas(100, 500);
  world.gravity.y = 4;

  drone = new Sprite(50, 0, 40, 10);
	
  floor = new Sprite(50, 498, 100, 6, "s");
}

function draw() {
  background(16);

  if (mouse.pressing()) {
    drone.bearing = -90;
    drone.applyForce(6);
  }
}