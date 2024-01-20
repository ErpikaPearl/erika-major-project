
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

  let StartText = new startScreenHolder.Group();
  StartText.width = 0;
  StartText.height = 0;
  StartText.x = canvas.w/2;
  StartText.y = canvas.h/4;

  let theGame = new StartText.Sprite(StartText.x, StartText.y - wallWidth, 0, 0);
  // StartText.colour = "white";
  theGame.textSize = 60;
  theGame.text = "  THE GAME.";
  theGame.textColor = "darkred";

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
  rules.lastSwitched = 0;
  rules.waitTime = 200;

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
  rulesInfo.textSize = 13;
  rulesInfo.text = `The point of this game is to collect all of the special (pink) coins 
  in the level and then get back to the top within the time frame. 
  The small coins give you extra points but are not necessary to 
  complete the level. 

  Controll the character using WASD or arrow keys. Use space to 
  jump and shift to dash.`
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
      detectMouseClick(begin)
    }
    else if (godMode.mouse.hovering()){
      infoText.text = `Begin the game but 
      in god mode. While in god mode, you 
      can't die.`;
      godMode.color = "red";
      infoText.visible = true;
      detectMouseClick(godMode)
    }
    else if (millis() > rules.lastSwitched + rules.waitTime){
      rules.color = "Red";
      detectMouseClick(rules)
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
    if (buttonThing === rules){
      rulesInfo.visible = !rulesInfo.visible;
      rules.lastSwitched = millis();
    }
    else{
      console.log(buttonThing.state);
    }
  }
}

