let dots;

function setup() {
	new Canvas(500, 50);

	dots = new Group();
	dots.color = 'yellow';
	dots.y = 25;
	dots.diameter = 10;
	
	while (dots.length < 5000) {
		let dotThing = new dots.Sprite();
		dotThing.x = dots.length * 20;
	}
}

function draw() {
	clear();
}