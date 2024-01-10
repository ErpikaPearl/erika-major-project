let cloudAni, player;

function preload(){
	runAni = loadAni('Assets/Running/frame_00001.png', 8);
}

function setup() {
	new Canvas(windowWidth, windowHeight);

  player = new Sprite();
  player.x = canvas.w/2;
  player.y = canvas.h/2;
  player.width = 50;
  player.height = 80;
  player.addAni("running", runAni, 8)
  player.anis.scale = .2;

  // cloudAni.frameDelay = 5;
  // cloudAni.scale = .2;

}

function draw() {
	clear();
	player.debug = mouse.pressing();
}