let floor, spriteA, spriteB, j;
let wallWidth = 50;

function setup() {
  new Canvas(windowWidth, windowHeight);
  world.gravity.y = 10;
  
  lazers = new Group();
  lazers.y = windowHeight/2;
  lazers.x = windowWidth/2;
  lazers.height = 400;
  lazers.width  = 20;
  lazers.collider = "static";

  let lazer0 = new lazers.Sprite();
  lazer0.height = lazers.width;
  lazer0.width = lazers.height;
  lazer0.interval = 1600;
  lazer0.lastSwitched = 0;
  lazer0.isSolid = true;

  let lazer1 = new lazers.Sprite();
  lazer1.interval = 1000;
  lazer1.lastSwitched = 0;
  lazer1.isSolid = true;
  lazer1.x = 50;

  john = new Group();
  john.y = windowHeight/2;
  john.x = windowWidth/2;
  john.height = 400;
  john.width  = 20;
  john.collider = "static";

  let jake = new john.Sprite();
  jake.height = john.width*10;
  jake.width = john.width*10;
  jake.interval = 1600;
  jake.lastSwitched = 0;
  jake.isSolid = true;

  allSprites.layer = 2;
  john.layer = 1;
}

function draw() {
  clear();

  // for (let lazer of lazers){
  //   lazerFlash(lazer);
  // }
}

// function lazerFlash(lazerThing){
//   if (millis() > lazerThing.interval + lazerThing.lastSwitched){
//     lazerThing.visible = !lazerThing.visible;
//     lazerThing.isSolid = ! lazerThing.isSolid;
//     if (lazerThing.isSolid){
//       console.log(lazerThing.isSolid);
//     }
//     else{
//       console.log("not");
//     }
//     lazerThing.lastSwitched = millis();
//   }
// }