let player, gems;
let money = 0;

function setup() {
	new Canvas(160, 456);

	gems = new Group();
	gems.diameter = 10;
	gems.x = () => random(0, canvas.w);
	gems.y = () => random(0, canvas.h);
	gems.amount = 80;

	player = new Sprite();

	player.overlaps(gems, collectThings);
}

function collectThings(player, gemThing) {
	gemThing.remove();
  money++;
  console.log(money);
}

function draw() {
	clear();
	player.moveTowards(mouse);
}