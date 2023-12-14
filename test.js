let player, ui;

function setup() {
  new Canvas(500, 240);
  player = new Sprite();
  player.d = 80;
  player.color = "magenta";

  ui = new Group();
  for (let i = 0; i < 9; i++) {
    new ui.Sprite(100 + i * 40, 210, 35, 35, "n");
  }
  camera.zoom = 0.5;
}

function draw() {
  background(0);

  camera.on();

  for (let i = 0; i < 10; i++) {
    fill(i * 20, 200, 200); // blue to gray
    rect(-250 + i * 50, -250 + i * 100, 750, 50);
  }
  player.moveTowards(mouse, 0.01);
  player.draw();
  camera.x = player.x;
  camera.y = player.y;

  camera.off();

  ui.color = "orange";
  for (let i = 0; i < 9; i++) {
    if (kb[i + 1]) {
      ui[i].color = "red";
    }
  }
  ui.draw();
}