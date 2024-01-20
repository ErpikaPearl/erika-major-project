
let endScreenHolder, buttons, restart, godMode, infoText;
let wallWidth = 50;
let wallet = [30, 0];

function setup() {
  new Canvas(1278, 710);
  angleMode(DEGREES);
  rectMode(CENTER);

  endScreenHolder = new Group();
  endScreenHolder.collider = "none";
  endScreenHolder.stroke = 1;

  let backgroundBox = new endScreenHolder.Sprite();
  backgroundBox.width = canvas.w;
  backgroundBox.height = canvas.h;
  backgroundBox.x = canvas.w/2;
  backgroundBox.y = canvas.h/2;
  backgroundBox.color = "grey";

  let deathText = new endScreenHolder.Group();
  deathText.width = 0;
  deathText.height = 0;
  deathText.x = canvas.w/2;
  deathText.y = canvas.h/4;

  let youDied = new deathText.Sprite(deathText.x, deathText.y, 0, 0);
  // deathText.colour = "white";
  youDied.textSize = 60;
  youDied.text = "  YOU DIED.";
  youDied.textColor = "darkred";

  let stats = new deathText.Sprite(deathText.x, deathText.y, 0, 0);
  stats.y = deathText.y + youDied.textSize*2.5;
  stats.textSize = 30;
  stats.text = `
    You collected: 

    ` + wallet[0] + ` small coins
    ` + wallet[1] + ` big coins
    `;

  buttons = new endScreenHolder.Group();
  buttons.width = wallWidth*5;
  buttons.height = wallWidth*3;
  buttons.y = canvas.h - canvas.h/4;
  buttons.color = "darkred";
  buttons.collider = "static";
  buttons.textSize = 30;

  restart = new buttons.Sprite();
  restart.x = canvas.w/3;
  restart.text = "RESTART";

  godMode = new buttons.Sprite();
  godMode.x = canvas.w - canvas.w/3;
  godMode.text = "GOD MODE";

  let floatText = new endScreenHolder.Group();
  floatText.width = wallWidth*5;
  floatText.height = wallWidth;
  floatText.visible = false;
  floatText.color = "white";

  infoText = new floatText.Sprite();
}

function draw() {
  clear();

  if (restart.mouse.hovering() || godMode.mouse.hovering()){
    if (restart.mouse.hovering()){
      infoText.text = "Resart the game from the beginning.";
      restart.color = "red";
    }
    else{
      infoText.text = `Resart the game from the beginning but 
      in god mode. While in god mode, you 
      can't die.`;
      godMode.color = "red";
    }
    infoText.visible = true;
    infoText.x = mouse.x + infoText.width/2;
    infoText.y = mouse.y - infoText.height/2;
  }
  else{
    infoText.visible = false;
    buttons.color = "darkred";
  }
}

