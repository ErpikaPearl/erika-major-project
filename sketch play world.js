// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//  Declaring Variables

//  Declaring sprites, assets and groups
let player, orgin, HUD, coinCount, timerCount, BigCoinCount, heart;
let lvlOneBackground, levelOne, levelOneCollectibles, lvlOneBase, lazers;
let solidsGroup = [];
let screenHolder, startButtons, begin, godModeStart, rules, titleText, infoText, rulesInfo, deathInfo;
let footStep0, footStep1, jump, jetPack0, wind;
//  Declaring world and camera variables
let levelState = "startScreen";
let cameraMovement = 50;
let wallWidth = 50;
let level = "One";
let totalCoins = 0;
let totalBigCoins = 6;
let timeLimit = 120;

//  Load in assets
function preload(){
  footStep0 = loadSound("Assets/footstep00.ogg");
  footStep1 = loadSound("Assets/footstep01.ogg");
  jump = loadSound("Assets/jump.wav");
  jetPack0 = loadSound("Assets/jetpack0.wav");
  wind = loadSound("Assets/wind.wav");

  footStep0.setVolume(0.1);
  footStep1.setVolume(0.08);
  jump.setVolume(1);
  jetPack0.setVolume(0.2);
  wind.setVolume(1);
}

function setup() {
  //  Set up world
  new Canvas(1278, 710);
  angleMode(DEGREES);
  rectMode(CENTER);
  world.gravity.y = 9.8;
  allSprites.autoCull = false;  //  Prevents sprites from dissapearing when too far away from the camera
  camera.zoom = 0.9;
  // camera.zoom = 0.1;

  //  Set up player
  player = new Sprite();
  player.width = 50;
  player.height = 80;
  player.mass = 70;
  player.color = "red";
  player.collider = "dynamic";
  player.visible = false;
  player.rotationLock = true;
  player.bounciness = 0;
  player.hp = 5;
  player.hpHolder = [];
  player.lastHurt = 0;
  player.gotHurt = false;
  player.timeLasted = 0;
  player.invulnerable = false;
  player.maxSpeed = 10;
  player.doubleJump = false;
  player.dash = true;
  player.lastSwitchedDash = 0;
  player.isOnGround = false;
  player.wallet = [0, 0];

  //  Set up HUD
  HUD = new Group();
  HUD.collider = "none";
  HUD.color = "white"; 
  HUD.y = 50;
  HUD.visible = false;

  BigCoinCount = new HUD.Sprite();
  BigCoinCount.x = 50;
  BigCoinCount.width = 60;
  BigCoinCount.height = 60;
  BigCoinCount.text = player.wallet[0];
  BigCoinCount.textSize = 40;
  BigCoinCount.color = "pink";

  coinCount = new HUD.Sprite();
  coinCount.x = BigCoinCount.x + BigCoinCount.width/2 + 50;
  coinCount.width = 60;
  coinCount.height = 60;
  coinCount.text = player.wallet[1];
  coinCount.textSize = 40;

  timerCount = new HUD.Sprite();
  timerCount.width = 100;
  timerCount.height = 60;
  timerCount.x = canvas.w - 30 - timerCount.width;
  timerCount.textSize = 40;

  for (let hp = 0; hp < player.hp; hp++){
    let heart = new HUD.Sprite();
    heart.radius = 20;
    heart.x = coinCount.x + coinCount.width + hp*30 + hp*heart.radius;
    heart.color = "red";
    player.hpHolder.push(heart);
  }


  //  Set up Level one
  //Note to Mr. Schellenberg: The levels are set up by making a sprite for each floor, wall, and platform.
  //This is very inefficient but there is no easier way to do this using p5 Play. I could have used p5 Play's
  //Tiles constructor, but this greatly limits what I would be able to do using the tiles. For example, I 
  //Wouldn't have been able to have the player interact differently will walls and floors.
  levelOne = new Group();
  levelOne.color = "green";
  levelOne.stroke = levelOne.color;
  levelOne.collider = "static";
  levelOne.friction = 4;
  levelOne.bounciness = 0.05;
  levelOne.wallBounciness = 0.3;
  levelOne.visible = false;

  lvlOneBackground = new Sprite();
  lvlOneBackground.color = "orange";
  lvlOneBackground.collider = "n";
  lvlOneBackground.x = 0;
  lvlOneBackground.y = 0;
  lvlOneBackground.width = 7000;
  lvlOneBackground.height = 2000;
  lvlOneBackground.visible = false;

  lvlOneBase = new levelOne.Sprite();
  lvlOneBase.color = "green";
  lvlOneBase.collider = "n";
  lvlOneBase.x = 0;
  lvlOneBase.y = lvlOneBackground.y + lvlOneBackground.height - 2;
  lvlOneBase.width = lvlOneBackground.width + wallWidth;
  lvlOneBase.height = 2000;

  // orgin = new Sprite();
  // orgin.diameter = 60;
  // orgin.x = 0;
  // orgin.y = 0;
  // orgin.collider = "static";
  
  //  Create walls and floors
  let lvlOneLeftWall = new levelOne.Sprite();
  lvlOneLeftWall.x = lvlOneBackground.x - lvlOneBackground.width/2;
  lvlOneLeftWall.y = lvlOneBackground.y;
  lvlOneLeftWall.width = wallWidth;
  lvlOneLeftWall.height = lvlOneBackground.height;
  lvlOneLeftWall.bounciness = levelOne.wallBounciness;
  // lvlOneLeftWall.visible = false;

  let lvlOneRightWall = new levelOne.Sprite();
  lvlOneRightWall.x = lvlOneBackground.x + lvlOneBackground.width/2;
  lvlOneRightWall.y = lvlOneBackground.y;
  lvlOneRightWall.width = wallWidth;
  lvlOneRightWall.height = lvlOneBackground.height;
  lvlOneRightWall.bounciness = levelOne.wallBounciness;

  let lvlOneFloorBottom = new levelOne.Sprite();
  lvlOneFloorBottom.x = lvlOneBackground.x;
  lvlOneFloorBottom.y = lvlOneBackground.y + lvlOneBackground.height/2;
  lvlOneFloorBottom.width = lvlOneBackground.width + wallWidth;
  lvlOneFloorBottom.height = wallWidth;
  solidsGroup.push(lvlOneFloorBottom);

  let lvlOneFloorFirstLeft = new levelOne.Sprite();
  lvlOneFloorFirstLeft.x = lvlOneBackground.x - wallWidth*3;
  lvlOneFloorFirstLeft.y = lvlOneFloorBottom.y - wallWidth*6;
  lvlOneFloorFirstLeft.width = lvlOneBackground.width - wallWidth*6;
  lvlOneFloorFirstLeft.height = wallWidth;
  solidsGroup.push(lvlOneFloorFirstLeft);
  let lvlOneFloorFirstRight = new levelOne.Sprite();
  lvlOneFloorFirstRight.x = lvlOneBackground.x + lvlOneBackground.width/2 - wallWidth;
  lvlOneFloorFirstRight.y = lvlOneFloorFirstLeft.y;
  lvlOneFloorFirstRight.width = lvlOneBackground.width - lvlOneFloorFirstLeft.width - wallWidth*3;
  lvlOneFloorFirstRight.height = wallWidth;
  solidsGroup.push(lvlOneFloorFirstRight);

  let lvlOneFloorSecond = new levelOne.Sprite();
  lvlOneFloorSecond.x = lvlOneBackground.x + wallWidth*3;
  lvlOneFloorSecond.y = lvlOneFloorFirstLeft.y - wallWidth*5;
  lvlOneFloorSecond.width = lvlOneBackground.width - wallWidth*5;
  lvlOneFloorSecond.height = wallWidth;
  solidsGroup.push(lvlOneFloorSecond);

  let lvlOneFloorThirdLeft = new levelOne.Sprite();
  lvlOneFloorThirdLeft.x = lvlOneBackground.x - wallWidth*10;
  lvlOneFloorThirdLeft.y = lvlOneFloorSecond.y - wallWidth*10;
  lvlOneFloorThirdLeft.width = lvlOneBackground.width - wallWidth*20;
  lvlOneFloorThirdLeft.height = wallWidth;
  solidsGroup.push(lvlOneFloorThirdLeft);
  let lvlOneFloorThirdRight = new levelOne.Sprite();
  lvlOneFloorThirdRight.x = lvlOneBackground.x + wallWidth*64;
  lvlOneFloorThirdRight.y = lvlOneFloorThirdLeft.y;
  lvlOneFloorThirdRight.width = lvlOneBackground.width/8 - wallWidth*5;
  lvlOneFloorThirdRight.height = wallWidth;
  solidsGroup.push(lvlOneFloorThirdRight);

  let lvlOneFloorFourthRight = new levelOne.Sprite();
  lvlOneFloorFourthRight.x = -(lvlOneBackground.x - wallWidth*10);
  lvlOneFloorFourthRight.y = lvlOneFloorThirdLeft.y - wallWidth*6;
  lvlOneFloorFourthRight.width = lvlOneBackground.width - wallWidth*20;
  lvlOneFloorFourthRight.height = wallWidth;
  solidsGroup.push(lvlOneFloorFourthRight);
  let lvlOneFloorFourthLeft = new levelOne.Sprite();
  lvlOneFloorFourthLeft.x = -(lvlOneBackground.x + wallWidth*64);
  lvlOneFloorFourthLeft.y = lvlOneFloorFourthRight.y;
  lvlOneFloorFourthLeft.width = lvlOneBackground.width/8 - wallWidth*5;
  lvlOneFloorFourthLeft.height = wallWidth;
  solidsGroup.push(lvlOneFloorFourthLeft);

  let lvlOneFloorFifthLeft = new levelOne.Sprite();
  lvlOneFloorFifthLeft.x = lvlOneBackground.x - lvlOneBackground.width/4 - wallWidth*4;
  lvlOneFloorFifthLeft.y = lvlOneBackground.y - lvlOneBackground.height/2;
  lvlOneFloorFifthLeft.width = lvlOneBackground.width/2 - wallWidth*7;
  lvlOneFloorFifthLeft.height = wallWidth;
  solidsGroup.push(lvlOneFloorFifthLeft);
  let lvlOneFloorFifthRight = new levelOne.Sprite();
  lvlOneFloorFifthRight.x = -lvlOneFloorFifthLeft.x;
  lvlOneFloorFifthRight.y = lvlOneBackground.y - lvlOneBackground.height/2;
  lvlOneFloorFifthRight.width = lvlOneFloorFifthLeft.width;
  lvlOneFloorFifthRight.height = wallWidth;
  solidsGroup.push(lvlOneFloorFifthRight);

  //  Create platforms
  let lvlOnePlaformFirst = new levelOne.Sprite();
  lvlOnePlaformFirst.x = lvlOneBackground.x + wallWidth*66;
  lvlOnePlaformFirst.y = lvlOneFloorBottom.y - wallWidth*3;
  lvlOnePlaformFirst.width = wallWidth*3;
  lvlOnePlaformFirst.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFirst);

  let lvlOnePlaformThirdLeft = new levelOne.Sprite();
  lvlOnePlaformThirdLeft.x = lvlOneBackground.x - wallWidth*25;
  lvlOnePlaformThirdLeft.y = lvlOneFloorSecond.y - wallWidth*4;
  lvlOnePlaformThirdLeft.width = wallWidth*35;
  lvlOnePlaformThirdLeft.height = wallWidth;
  solidsGroup.push(lvlOnePlaformThirdLeft);
  let lvlOnePlaformThirdMiddle = new levelOne.Sprite();
  lvlOnePlaformThirdMiddle.x = lvlOneBackground.x + wallWidth*54;
  lvlOnePlaformThirdMiddle.y = lvlOneFloorSecond.y - wallWidth*4;
  lvlOnePlaformThirdMiddle.width = wallWidth*8;
  lvlOnePlaformThirdMiddle.height = wallWidth;
  solidsGroup.push(lvlOnePlaformThirdMiddle);
  let lvlOnePlaformThirdRight = new levelOne.Sprite();
  lvlOnePlaformThirdRight.x = lvlOneBackground.x + wallWidth*56;
  lvlOnePlaformThirdRight.y = lvlOneFloorSecond.y - wallWidth*7;
  lvlOnePlaformThirdRight.width = wallWidth*4;
  lvlOnePlaformThirdRight.height = wallWidth;
  solidsGroup.push(lvlOnePlaformThirdRight);

  let lvlOnePlaformFourth = new levelOne.Sprite();
  lvlOnePlaformFourth.x = lvlOneBackground.x - wallWidth*56;
  lvlOnePlaformFourth.y = lvlOneFloorThirdLeft.y - wallWidth*4;
  lvlOnePlaformFourth.width = wallWidth*4;
  lvlOnePlaformFourth.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFourth);

  let lvlOnePlaformFifthMiddle = new levelOne.Sprite();
  lvlOnePlaformFifthMiddle.x = lvlOneBackground.x;
  lvlOnePlaformFifthMiddle.y = lvlOneFloorFourthRight.y - wallWidth*8;
  lvlOnePlaformFifthMiddle.width = wallWidth*8;
  lvlOnePlaformFifthMiddle.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFifthMiddle);
  let lvlOnePlaformFifthLeft = new levelOne.Sprite();
  lvlOnePlaformFifthLeft.x = lvlOneBackground.x - wallWidth*8;
  lvlOnePlaformFifthLeft.y = lvlOneFloorFourthRight.y - wallWidth*5;
  lvlOnePlaformFifthLeft.width = wallWidth*5;
  lvlOnePlaformFifthLeft.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFifthLeft);
  let lvlOnePlaformFifthRight = new levelOne.Sprite();
  lvlOnePlaformFifthRight.x = -lvlOnePlaformFifthLeft.x;
  lvlOnePlaformFifthRight.y = lvlOneFloorFourthRight.y - wallWidth*5;
  lvlOnePlaformFifthRight.width = wallWidth*5;
  lvlOnePlaformFifthRight.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFifthRight);
  let lvlOnePlaformFifthRightmost0 = new levelOne.Sprite();
  lvlOnePlaformFifthRightmost0.x = lvlOneBackground.x + wallWidth*42;
  lvlOnePlaformFifthRightmost0.y = lvlOneFloorFourthRight.y - wallWidth*6;
  lvlOnePlaformFifthRightmost0.width = wallWidth*41;
  lvlOnePlaformFifthRightmost0.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFifthRightmost0);
  let lvlOnePlaformFifthRightmost1 = new levelOne.Sprite();
  lvlOnePlaformFifthRightmost1.x = lvlOneBackground.x + wallWidth*68;
  lvlOnePlaformFifthRightmost1.y = lvlOneFloorFourthRight.y - wallWidth*3;
  lvlOnePlaformFifthRightmost1.width = wallWidth*5;
  lvlOnePlaformFifthRightmost1.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFifthRightmost1);
  let lvlOnePlaformFifthLeftmost = new levelOne.Sprite();
  lvlOnePlaformFifthLeftmost.x = lvlOneBackground.x - wallWidth*65;
  lvlOnePlaformFifthLeftmost.y = lvlOneFloorFourthRight.y - wallWidth*4;
  lvlOnePlaformFifthLeftmost.width = wallWidth*4;
  lvlOnePlaformFifthLeftmost.height = wallWidth;
  solidsGroup.push(lvlOnePlaformFifthLeftmost);

  //   Create secondary walls
  let lvlOneWallFirst0 = new levelOne.Sprite();
  lvlOneWallFirst0.x = lvlOneBackground.x - wallWidth*60;
  lvlOneWallFirst0.y = (lvlOneFloorBottom.y + lvlOneFloorFirstLeft.y)/2 - wallWidth*1;
  lvlOneWallFirst0.width = wallWidth;
  lvlOneWallFirst0.height = wallWidth*3;
  lvlOneWallFirst0.bounciness = levelOne.wallBounciness;
  let lvlOneWallFirst1 = new levelOne.Sprite();
  lvlOneWallFirst1.x = lvlOneWallFirst0.x + wallWidth*15;
  lvlOneWallFirst1.y = lvlOneWallFirst0.y;
  lvlOneWallFirst1.width = wallWidth;
  lvlOneWallFirst1.height = lvlOneWallFirst0.height;
  lvlOneWallFirst1.bounciness = levelOne.wallBounciness;
  let lvlOneWallFirst2 = new levelOne.Sprite();
  lvlOneWallFirst2.x = lvlOneWallFirst0.x + wallWidth*55;
  lvlOneWallFirst2.y = lvlOneWallFirst0.y;
  lvlOneWallFirst2.width = wallWidth;
  lvlOneWallFirst2.height = lvlOneWallFirst0.height;
  lvlOneWallFirst2.bounciness = levelOne.wallBounciness;
  let lvlOneWallFirst3 = new levelOne.Sprite();
  lvlOneWallFirst3.x = lvlOneBackground.x + wallWidth*45;
  lvlOneWallFirst3.y = lvlOneWallFirst0.y;
  lvlOneWallFirst3.width = wallWidth;
  lvlOneWallFirst3.height = lvlOneWallFirst0.height;
  lvlOneWallFirst3.bounciness = levelOne.wallBounciness;

  let lvlOneWallSecond0 = new levelOne.Sprite();
  lvlOneWallSecond0.x = lvlOneBackground.x - wallWidth*40;
  lvlOneWallSecond0.y = (lvlOneFloorFirstLeft.y + lvlOneFloorSecond.y)/2 - wallWidth*1;
  lvlOneWallSecond0.width = wallWidth;
  lvlOneWallSecond0.height = wallWidth*2;
  lvlOneWallSecond0.bounciness = levelOne.wallBounciness;
  let lvlOneWallSecond1 = new levelOne.Sprite();
  lvlOneWallSecond1.x =  lvlOneWallSecond0.x + wallWidth*30;
  lvlOneWallSecond1.y = lvlOneWallSecond0.y;
  lvlOneWallSecond1.width = wallWidth;
  lvlOneWallSecond1.height = wallWidth*2;
  lvlOneWallSecond1.bounciness = levelOne.wallBounciness;
  let lvlOneWallSecond2 = new levelOne.Sprite();
  lvlOneWallSecond2.x =  lvlOneWallSecond0.x + wallWidth*70;
  lvlOneWallSecond2.y = lvlOneWallSecond0.y;
  lvlOneWallSecond2.width = wallWidth;
  lvlOneWallSecond2.height = wallWidth*2;
  lvlOneWallSecond2.bounciness = levelOne.wallBounciness;

  let lvlOneWallThird0 = new levelOne.Sprite();
  lvlOneWallThird0.x = lvlOneBackground.x - wallWidth*25;
  lvlOneWallThird0.y = (lvlOneFloorSecond.y + lvlOneFloorThirdLeft.y)/2 - wallWidth*2;
  lvlOneWallThird0.width = wallWidth;
  lvlOneWallThird0.height = wallWidth*5;
  lvlOneWallThird0.bounciness = levelOne.wallBounciness;
  let lvlOneWallThird1 = new levelOne.Sprite();
  lvlOneWallThird1.x = lvlOneBackground.x + wallWidth*58;
  lvlOneWallThird1.y = lvlOneWallThird0.y;
  lvlOneWallThird1.width = wallWidth;
  lvlOneWallThird1.height = wallWidth*7;
  lvlOneWallThird1.bounciness = levelOne.wallBounciness;

  let lvlOneWallFourth0 = new levelOne.Sprite();
  lvlOneWallFourth0.x = lvlOneBackground.x - wallWidth*58;
  lvlOneWallFourth0.y = (lvlOneFloorThirdLeft.y + lvlOneFloorFourthLeft.y)/2 - wallWidth*2;
  lvlOneWallFourth0.width = wallWidth;
  lvlOneWallFourth0.height = wallWidth*3;
  lvlOneWallFourth0.bounciness = levelOne.wallBounciness;
  let lvlOneWallFourth1 = new levelOne.Sprite();
  lvlOneWallFourth1.x = lvlOneBackground.x - wallWidth*20;
  lvlOneWallFourth1.y = (lvlOneFloorThirdLeft.y + lvlOneFloorFourthLeft.y)/2 - wallWidth*1;
  lvlOneWallFourth1.width = wallWidth;
  lvlOneWallFourth1.height =lvlOneWallFourth0.height;
  lvlOneWallFourth1.bounciness = levelOne.wallBounciness;
  let lvlOneWallFourth2 = new levelOne.Sprite();
  lvlOneWallFourth2.x = lvlOneBackground.x + wallWidth*20;
  lvlOneWallFourth2.y = (lvlOneFloorThirdLeft.y + lvlOneFloorFourthLeft.y)/2 - wallWidth*1;
  lvlOneWallFourth2.width = wallWidth;
  lvlOneWallFourth2.height = lvlOneWallFourth0.height;
  lvlOneWallFourth2.bounciness = levelOne.wallBounciness;

  let lvlOneWallFifth0 = new levelOne.Sprite();
  lvlOneWallFifth0.x = lvlOneBackground.x - wallWidth*63;
  lvlOneWallFifth0.y = (lvlOneFloorFourthLeft.y + lvlOneFloorFifthLeft.y)/2 - wallWidth*1;
  lvlOneWallFifth0.width = wallWidth;
  lvlOneWallFifth0.height = wallWidth*10;
  lvlOneWallFifth0.bounciness = levelOne.wallBounciness;
  let lvlOneWallFifth1 = new levelOne.Sprite();
  lvlOneWallFifth1.x = lvlOneBackground.x + wallWidth*22;
  lvlOneWallFifth1.y = lvlOneWallFifth0.y; 
  lvlOneWallFifth1.width = wallWidth;
  lvlOneWallFifth1.height = wallWidth*10;
  lvlOneWallFifth1.bounciness = levelOne.wallBounciness;

  //  Place player a the top of the level
  player.y = -lvlOneBackground.height/2 - wallWidth*1.5;
  player.x = lvlOneBackground.width/2 - wallWidth*5;

  levelOneCollectibles = new Group();
  levelOneCollectibles.diameter = wallWidth*1.5;
  levelOneCollectibles.collider = "none";
  levelOneCollectibles.color = "pink";
  levelOneCollectibles.special = true;
  levelOneCollectibles.visible = false;

  let bigCoin1 = new levelOneCollectibles.Sprite();
  bigCoin1.y = lvlOnePlaformFifthLeftmost.y - wallWidth*5;
  bigCoin1.x = -lvlOneBackground.width/2 + wallWidth*3;
  let bigCoin2 = new levelOneCollectibles.Sprite();
  bigCoin2.y = lvlOnePlaformFifthLeftmost.y - wallWidth*4;
  bigCoin2.x = lvlOneBackground.x + wallWidth*24;
  let bigCoin3 = new levelOneCollectibles.Sprite();
  bigCoin3.y = lvlOneFloorThirdLeft.y - wallWidth*2;
  bigCoin3.x = -lvlOneBackground.width/2 + wallWidth*2;
  let bigCoin4 = new levelOneCollectibles.Sprite();
  bigCoin4.y = lvlOneFloorSecond.y - wallWidth*6;
  bigCoin4.x = lvlOneBackground.x - wallWidth*28;
  let bigCoin5 = new levelOneCollectibles.Sprite();
  bigCoin5.y = lvlOneFloorSecond.y - wallWidth*6;
  bigCoin5.x = lvlOneBackground.width/2 - wallWidth*2;
  let bigCoin6 = new levelOneCollectibles.Sprite();
  bigCoin6.y = lvlOneFloorBottom.y - wallWidth*2;
  bigCoin6.x = -lvlOneBackground.width/2 + wallWidth*2;

  let floor0 = 6;
  let floor1 = 4;
  let floor2 = 6;
  let floor3 = 4;
  let floor4 = 6;
  totalCoins = floor0 + floor1 + floor2 + floor3 + floor4;
  for (let i = 0; i < totalCoins; i++){
    let coin = new levelOneCollectibles.Sprite();
    coin.color = "yellow";
    coin.diameter = wallWidth;
    coin.special = false;
    if (floor0 > 0){
      coin.y = lvlOneFloorBottom.y - wallWidth*2;
      floor0 --;
    }
    else if (floor1 > 0){
      coin.y = lvlOneFloorFirstLeft.y - wallWidth*2;
      floor1 --;
    }
    else if (floor2 > 0){
      coin.y = lvlOneFloorSecond.y - wallWidth*2;
      floor2 --;
    }
    else if (floor3 > 0){
      coin.y = lvlOneFloorThirdLeft.y - wallWidth*2;
      floor3 --;
    }
    else if (floor4 > 0){
      coin.y = lvlOneFloorFourthLeft.y - wallWidth*2;
      floor4 --;
    }
    coin.x = random(lvlOneBackground.x - lvlOneBackground.width/2 + wallWidth, lvlOneBackground.x + lvlOneBackground.width/2 - wallWidth);
  }

  //  Create hostiles
  lazers = new Group();
  lazers.y = windowHeight/2;
  lazers.x = windowWidth/2;
  lazers.thickness  = 20;
  lazers.collider = "static";
  lazers.color = "blue";
  lazers.isSolid = true;
  lazers.visible = false;

  let lazerEntrance = new lazers.Sprite();
  lazerEntrance.x = lvlOneBackground.x;
  lazerEntrance.y = -lvlOneBackground.height/2;
  lazerEntrance.height = lazers.thickness;
  lazerEntrance.width = wallWidth*15;
  lazerEntrance.interval = 1600;
  lazerEntrance.lastSwitched = 0;

  let lazerBottom = new lazers.Sprite();
  lazerBottom.x = -wallWidth*52.5;
  lazerBottom.y = lvlOneFloorBottom.y - wallWidth*3;
  lazerBottom.height = wallWidth*5;
  lazerBottom.width = lazers.thickness*35;
  lazerBottom.interval = 1600;
  lazerBottom.lastSwitched = 0;

  let lazerMiddle = new lazers.Sprite();
  lazerMiddle.x = lvlOneBackground.x;
  lazerMiddle.y = lvlOneFloorSecond.y - wallWidth*4;
  lazerMiddle.height = lazers.thickness;
  lazerMiddle.width = lvlOneBackground.width - wallWidth;
  lazerMiddle.interval = 2600;
  lazerMiddle.lastSwitched = 0;

  let lazerTopLeftRoom = new lazers.Sprite();
  lazerTopLeftRoom.x = -wallWidth*68;
  lazerTopLeftRoom.y = lvlOnePlaformFifthRightmost0.y + wallWidth*2;
  lazerTopLeftRoom.height = lazers.thickness;
  lazerTopLeftRoom.width = wallWidth*3;
  lazerTopLeftRoom.interval = 1600;
  lazerTopLeftRoom.lastSwitched = 0;

  for (let i = 5; i>0; i--){  //  Top right room, top floor
    let lazer1 = new lazers.Sprite();
    lazer1.x = wallWidth*68 - i*wallWidth*8;
    lazer1.y = lvlOnePlaformFifthLeftmost.y - wallWidth*5.5;
    lazer1.height = wallWidth*7;
    lazer1.width = lazers.thickness;
    lazer1.interval = 2000;
    lazer1.lastSwitched = i*600;
  }
  for (let i = 0; i<5; i++){  //  Top right room, bottom floor
    let lazer2 = new lazers.Sprite();
    lazer2.x = wallWidth*28 + i*wallWidth*8;
    lazer2.y = lvlOnePlaformFifthLeftmost.y + wallWidth*1;
    lazer2.height = wallWidth*5;
    lazer2.width = lazers.thickness;
    lazer2.interval = 2000;
    lazer2.lastSwitched = i*600;
  }
  for (let i = 5; i>0; i--){  //  bottom room
    let lazer3 = new lazers.Sprite();
    lazer3.x = -wallWidth*2 - i*wallWidth*8;
    lazer3.y = lvlOneFloorBottom.y - wallWidth*3;
    lazer3.height = wallWidth*5;
    lazer3.width = lazers.thickness;
    lazer3.interval = 1600;
    lazer3.lastSwitched = i*600;
  }
  for (let i = 5; i>0; i--){  //  Main room, top floor
    let lazer4 = new lazers.Sprite();
    lazer4.x = -wallWidth*7 - i*wallWidth*8;
    lazer4.y = lvlOnePlaformFifthLeftmost.y - wallWidth*2.5;
    lazer4.height = wallWidth*12;
    lazer4.width = lazers.thickness;
    lazer4.interval = 900;
    lazer4.lastSwitched = i*300;
  }
  for (let i = 8; i>0; i--){  //  Main room, fourth floor
    let lazer5 = new lazers.Sprite();
    lazer5.x = wallWidth*28 - i*wallWidth*8;
    lazer5.y = lvlOneFloorThirdLeft.y - wallWidth*3;
    lazer5.height = wallWidth*6;
    lazer5.width = lazers.thickness;
    lazer5.interval = 900;
    lazer5.lastSwitched = i*300;
    if (i === 1 || i === 6){
      lazer5.y = lvlOneFloorThirdLeft.y - wallWidth*1;
      lazer5.height = wallWidth*3;
    }
  }
  for (let i = 10; i>0; i--){  //  Main room, second floor
    let lazer6 = new lazers.Sprite();
    lazer6.x = wallWidth*20 - i*wallWidth*6;
    lazer6.y = lvlOneFloorFirstLeft.y - wallWidth*2.5;
    lazer6.height = wallWidth*4;
    lazer6.width = lazers.thickness;
    lazer6.interval = 1600;
    lazer6.lastSwitched = i*600;
    if (i === 5 || i === 10){
      lazer6.y = lazer6.y + wallWidth;
      lazer6.height = wallWidth*2;
    }
  }
  for (let i = 2; i>0; i--){  //  Top right room, top floor
    let lazer7 = new lazers.Sprite();
    lazer7.x = -wallWidth*50 - i*wallWidth*4;
    lazer7.y = lvlOneFloorThirdLeft.y - wallWidth*2;
    lazer7.height = wallWidth*3;
    lazer7.width = lazers.thickness;
    lazer7.interval = 600;
    lazer7.lastSwitched = i*600;
  }

  //  Create the start screen 
  screenHolder = new Group();
  screenHolder.collider = "none";
  screenHolder.stroke = 1;
  screenHolder.visible = true;

  let backgroundBox = new screenHolder.Sprite();
  backgroundBox.width = canvas.w;
  backgroundBox.height = canvas.h;
  backgroundBox.x = canvas.w/2;
  backgroundBox.y = canvas.h/2;
  backgroundBox.color = "grey";

  titleText = new screenHolder.Sprite();
  titleText.width = 0;
  titleText.height = 0;
  titleText.x = canvas.w/2;
  titleText.y = canvas.h/5;
  titleText.textSize = 60;
  titleText.text = "  THE GAME.";
  titleText.textColor = "darkred";

  buttons = new screenHolder.Group();
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
  godMode.state = "godMode"

  rules = new buttons.Sprite();
  rules.x = canvas.w/2;
  rules.y = canvas.h/3;
  rules.height = wallWidth;
  rules.width = wallWidth*8;
  rules.text = "RULES";
  rules.state = "rules";
  rules.lastSwitched = 0;
  rules.waitTime = 200;

  let floatText = new screenHolder.Group();
  floatText.width = wallWidth*5;
  floatText.height = wallWidth;
  floatText.visible = false;
  floatText.color = "white";

  infoText = new floatText.Sprite();

  rulesInfo = new floatText.Group();
  rulesInfo.textSize = 13;

  healthInfo = new rulesInfo.Sprite();
  healthInfo.x = wallWidth*6.5;
  healthInfo.y = wallWidth*2.5;
  healthInfo.width = 0;
  healthInfo.height = 0;
  healthInfo.text = `  ↑
  This shows you your current health.
  When it reaches zero you die`;

  coinsInfo = new rulesInfo.Sprite();
  coinsInfo.x = wallWidth*2.8;
  coinsInfo.y = wallWidth*3.7;
  coinsInfo.width = 0;
  coinsInfo.height = 0;
  coinsInfo.text = `  ↑
  |
  |
  |
  This shows you your coins. The 
  pink coins are the amount of
  special coins you have, and 
  the white coins are the amount 
  of normal coins you have`;

  timeInfo = new rulesInfo.Sprite();
  timeInfo.x = wallWidth*21.9;
  timeInfo.y = wallWidth*2.8;
  timeInfo.width = 0;
  timeInfo.height = 0;
  timeInfo.text = `  ↑
  This shows the current time.
  When it reaches the time limit,
  ` + timeLimit + ` seconds, you die.`;

  mainRules = new rulesInfo.Sprite();
  mainRules.x = canvas.w/2;
  mainRules.height = wallWidth*3.5;
  mainRules.width = rules.width;
  mainRules.y = rules.y + rules.height/2 + mainRules.height/2;
  // mainRules.textSize = 13;
  mainRules.text = `The point of this game is to collect all of the special (pink) coins 
  in the level and then get back to the top within the time frame. 
  The small coins give you extra points but are not necessary to 
  complete the level. 

  Controll the character using WASD or arrow keys. Use space to 
  jump and shift to dash.`;
}

function draw() {
  clear();

  //  Draw start screen
  if (levelState === "startScreen"){
    screenHolder.draw();
    detectMouseImputs();
  }

  //  Draw level one
  else if (levelState === "levelOne" || levelState === "godMode"){
    //  Make level visible
    levelOne.visible = true;
    lazers.visible = true;
    lvlOneBackground.visible = true;
    player.visible = true;
    HUD.visible = true;

    screenHolder.visible = false;

    //  Update text
    timerCount.text = floor(millis()/1000);
    BigCoinCount.text = player.wallet[1];
    coinCount.text = player.wallet[0];

    camera.on();
    lvlOneBackground.draw();
    lazers.draw();
    levelOne.draw();

    //  Do all functions
    managePlayerStates();
    detectPlayerImput();
    player.overlaps(levelOneCollectibles, collectItems);
    for (let lazer of lazers){
      lazerFlash(lazer);
    }
    //  Only let the player take damage if in normal mode 
    if (levelState === "levelOne"){
      deathCoolDown(millis());
    }
    else {
      player.invulnerable = true;
    }
  
    //  Move camera to follow player
    camera.x = player.x;
    camera.y = player.y; 

    //  Draw HUD
    camera.off();
    HUD.draw();
  } 

  //  Draw start screen
  else if (levelState === "deathScreen"){
    levelOne.visible = false;
    lazers.visible = false;
    lvlOneBackground.visible = false;
    player.visible = false;
    HUD.visible = false;
    screenHolder.visible = true;

    titleText.text = " YOU DIED."
    rules.text = "VIEW STATS"
    rulesInfo.text = "";
    mainRules.textSize = 20;
    mainRules.text = `Overall, you:

    lasted ` + player.timeLasted + ` seconds
    collected ` + player.wallet[1] + ` special coins
    collected ` + player.wallet[0] + ` normal coins`

    screenHolder.draw();
    detectMouseImputs();
  }
  
}

function mousePressed(){
  if(!wind.isPlaying() && level === "One"){
    wind.loop();
  }
}

function keyPressed(){
  //  Player Movements
  if (keyCode === 32){  //  (SPACE) Jump
    if (player.isOnGround){
      jump.play();
      player.applyForceScaled(0, -400);      
    }
    else if (player.doubleJump && !player.isOnGround){
      jetPack0.play();
      player.applyForceScaled(0, -300);
      player.doubleJump = false;
    }
  }
  
  if (keyCode === 16 && player.dash){  //  (SHIFT) Dash in the direction player is facing
    let waitTime = 1000;
    
    if (millis() > waitTime + player.lastSwitchedDash){
      jetPack0.play();
      if (player.bearing === 360){
        player.applyForceScaled(800, 0);
      }
      else if (player.bearing === 180){
        player.applyForceScaled(-800, 0);
      }
      player.lastSwitchedDash = millis();
    }
  }
}

function detectPlayerImput(){
  //  Player Movements
  if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && player.vel.x >= -player.maxSpeed){  //  A (LEFT)
    player.bearing = 180;
    if (player.isOnGround){
      player.applyForceScaled(-50, 0);
      walkSound();
    }
    else{
      player.applyForceScaled(-5, 0);
    }
  }
  else if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && player.vel.x <= player.maxSpeed){  // D (RIGHT)
    player.bearing = 360;
    if (player.isOnGround){
      player.applyForceScaled(50, 0);
      walkSound();
    }
    else{
      player.applyForceScaled(5, 0);
    }
  }
  //  Slows down player when they stop walking
  else if(player.vel.x > 0 && player.bearing === 360 && player.isOnGround){
    player.vel.x --;
  }
  else if(player.vel.x < 0 && player.bearing === 180 && player.isOnGround){
    player.vel.x ++;
  }
}

function managePlayerStates(){
  player.isOnGround = false;
  for (let i = 0; i < solidsGroup.length; i++){
    if (player.colliding(solidsGroup[i])){  //  If touching any ground object
      player.doubleJump = true;
      player.isOnGround = true;
    }
  }
  for (let lazer of lazers){
    if (player.colliding(lazer) && player.invulnerable === false){  //  If touching any lazer and the player can take damage
      player.hp--;
      player.hpHolder[player.hp].remove();
      player.lastHurt = millis();
      player.gotHurt = true;
    }
  }
  if (player.hp === 0 || floor(millis()/1000) > timeLimit){
    levelState = "deathScreen";
    console.log(levelState);
    player.timeLasted = floor(millis());
  }
}

function deathCoolDown(){
  let waitTime = 1000;
  if (player.gotHurt){
    player.invulnerable = true;
    player.color = "pink";
    if (millis() > waitTime + player.lastHurt){
      player.invulnerable = false;
      player.gotHurt = false;
      player.color = "red";
    }
  }
}

function walkSound(){
  let played = 0;
  if (played === 0 && !footStep0.isPlaying()){
    footStep0.play();
    played = 1;
    if (played === 1 && !footStep1.isPlaying()){
      footStep1.play();
      played = 2;
    }
  }
}

function collectItems(player, itemSpirte){
  if (itemSpirte.special === true){
    player.wallet[1] = player.wallet[1] + 1;
  }
  else {
    player.wallet[0] = player.wallet[0] + 1;
  }
  itemSpirte.remove();
  console.log(player.wallet);
}

//  make lazers under player and change to overlapping
function lazerFlash(lazerThing){
  if (millis() > lazerThing.interval + lazerThing.lastSwitched){
    // lazerThing.visible = !lazerThing.visible;
    lazerThing.isSolid = ! lazerThing.isSolid;
    if (lazerThing.isSolid){
      lazerThing.collider = "static";
      lazerThing.color = "blue";

    }
    else{
      lazerThing.collider = "none";
      lazerThing.color = "lightblue";

    }
    lazerThing.lastSwitched = millis();
  }
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
      if (levelState === "startScreen"){
        HUD.visible = !HUD.visible;
      }
      rules.lastSwitched = millis();
    }
    else{
      levelState = buttonThing.state;
    }
  }
}
