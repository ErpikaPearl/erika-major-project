
let startScreenHolder, buttons, begin, godMode, rules, infoText, rulesInfo;
let wallWidth = 50;

function setup() {
  new Canvas(1278, 710);
  angleMode(DEGREES);
  rectMode(CENTER);

  startScreenHolder = new Group();
  startScreenHolder.collider = "none";
  startScreenHolder.stroke = 1;

  let backgroundBox = new startScreenHolder.Sprite();
  backgroundBox.width = canvas.w;
  backgroundBox.height = canvas.h;
  backgroundBox.x = canvas.w/2;
  backgroundBox.y = canvas.h/2;
  backgroundBox.color = "grey";

  let deathText = new startScreenHolder.Group();
  deathText.width = 0;
  deathText.height = 0;
  deathText.x = canvas.w/2;
  deathText.y = canvas.h/4;

  let youDied = new deathText.Sprite(deathText.x, deathText.y, 0, 0);
  // deathText.colour = "white";
  youDied.textSize = 60;
  youDied.text = "  THE GAME.";
  youDied.textColor = "darkred";

  buttons = new startScreenHolder.Group();
  buttons.width = wallWidth*5;
  buttons.height = wallWidth*3;
  buttons.y = canvas.h - canvas.h/4;
  buttons.color = "darkred";
  buttons.collider = "static";
  buttons.textSize = 30;

  begin = new buttons.Sprite();
  begin.x = canvas.w/3;
  begin.text = "BEGIN";
  begin.state = "levelOne"

  godMode = new buttons.Sprite();
  godMode.x = canvas.w - canvas.w/3;
  godMode.text = "GOD MODE";
  godMode.state = "godmode"

  rules = new buttons.Sprite();
  rules.x = canvas.w/2;
  rules.y = canvas.h/3;
  rules.height = wallWidth;
  rules.width = wallWidth*8;
  rules.text = "RULES";
  rules.state = "rules";

  let floatText = new startScreenHolder.Group();
  floatText.width = wallWidth*5;
  floatText.height = wallWidth;
  floatText.visible = false;
  floatText.color = "white";

  infoText = new floatText.Sprite();

  rulesInfo = new floatText.Sprite();
  rulesInfo.x = canvas.w/2;
  rulesInfo.height = wallWidth*3.5;
  rulesInfo.width = rules.width;
  rulesInfo.y = rules.y + rules.height/2 + rulesInfo.height/2;
}

function draw() {
  clear();
  detectMouseImputs();
  
}


function detectMouseImputs(){
  if (begin.mouse.hovering() || godMode.mouse.hovering() || rules.mouse.hovering()){
    if (begin.mouse.hovering()){
      infoText.text = "Begin the game.";
      begin.color = "red";
      infoText.visible = true;
    }
    else if (godMode.mouse.hovering()){
      infoText.text = `Begin the game but 
      in god mode. While in god mode, you 
      can't die.`;
      godMode.color = "red";
      infoText.visible = true;
    }
    else {
      rules.color = "Red";
    }
    infoText.x = mouse.x + infoText.width/2;
    infoText.y = mouse.y - infoText.height/2;
  }
  else{
    infoText.visible = false;
    buttons.color = "darkred";
  }
}

function detectMouseClick(buttonThing){
  if (buttonThing.mouse.pressing()){
    console.log(buttonThing.state);
  }
}

