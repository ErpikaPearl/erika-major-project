// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridOne;
let player;
let testGrid = [];

let accelerationGravity = -9.8; //  m/s^2

function preload(){
  testGrid = loadJSON("Test Level.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  gridOne = new Grid(0, 0);
  gridOne.generateFull();

  player = new Player();
  
}

function draw() {
  background(220);
  

  gridOne.display();
  player.display();
  player.gravityHeight();
}

class Grid {
  constructor(xOffset, yOffset){
    this.GRID_HEIGHT = 60;
    this.GRID_WIDTH = 120;
    
    this.grid = [];
    this.cellSize = 10;

    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.xindent = (width - this.GRID_WIDTH * this.cellSize)/2;
    this.yindent = (height - this.GRID_HEIGHT * this.cellSize)/2;

  }

  generateEmpty(){
    //  Generates an empty grid in size given
  
    let randomArray = [];
    for (let y = 0; y < this.GRID_WIDTH; y++){
      randomArray.push([]);
      for (let x = 0; x < this.GRID_HEIGHT; x++){
        randomArray[y].push(0);
      }
    }
    this.grid = randomArray;
  }

  generateFull(){
    //  Generates a grid in size given from json File
    this.grid = testGrid;
  }
  
  display(){
    //  fills the grid in whatever colour dependent on draw state
    
    for (let y = 0; y < this.GRID_HEIGHT; y++){
      for (let x = 0; x < this.GRID_WIDTH; x++){
        if (this.grid[y][x] === 1){
          fill("green");
        }
        else if (this.grid[y][x] === 4){
          fill("blue");
        }
        else if (this.grid[y][x] === 5){
          fill("black");
        }
        else if (this.grid[y][x] === 6){
          fill("aqua");
        }
        else if (this.grid[y][x] === 7){
          fill("brown");
        }
        else{
          fill("white");
        }
        stroke(1);
        rect(x*this.cellSize - this.xOffset + this.xindent, y*this.cellSize - this.xOffset + this.yindent, this.cellSize, this.cellSize);
      }
    }
  }
}

class Player {
  constructor(){
    this.x = width/2;
    this.y = height/2;
    this.w = 30;
    this.h = 50;
    this.mass = 3;

    // this.speedY = 0;
    // this.forceG = 0;
    // this.timei = 0;
    // this.timef = 0;
    // this.velocityYi = 0;
    // this.velocityYf = 0;

    // this.gravitynum = 0;
    // this.gravityspeed = 2;
    // this.speedx = 0;
    // this.speedy = 2;

    // this.lastSwitched = 0;
    // this.waitTime = 2000;

    this.heightUp = 0;

    this.colour = "red";
  }

  display(){
    fill(this.colour);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }


  // gravityReal(){
  //   this.timei = frameCount;
  //   // this.forceG = this.mass * this.gravity / 2; //  Calculates the value of the grvaitational force
  //   if (frameCount > this.lastSwitched + this.waitTime){
  //     this.velocityYf = accelerationGravity*(frameCount - this.timei) + this.velocityYi;   //  Kinematics equation to find fiinal velocity
  //     this.lastSwitched = frameCount;
  //     this.y = this.velocityYf;
  //     this.velocityYi = this.velocityYf;
  //     this.velocityYf = 0;
  //   }
  // }
  
  gravityHeight(){
    let xVal = Math.floor((this.x + this.w/2)/gridOne.GRID_WIDTH);
    let yVal = Math.floor((this.y + this.h)/gridOne.GRID_HEIGHT);

    this.heightUp = checkHeightActivation(xVal, yVal, testGrid, 1);
    
    console.log(this.heightUp);
  }
}

function checkHeightActivation(x, y, grid, state){
  //  Activates the checkHeight fucntion
  let counter = 0;

  if (grid[y][x] !== state){
    counter = checkHeight(x, y, grid, state, counter);
  }
  return counter;
}

function checkHeight(x, y, grid, state, counter){
  //  Draws a vertical or horizontal line

  //  Get size of grid
  let rows = grid.length;
  let cols = grid[y+1].length;
  
  // Base case: outside of grid or the square is already coloured 
  if (x < 0 || x >= rows || y < 0 || y >= cols || grid[y][x] === state){
    return counter;
  }
  else {
    counter ++;
    checkHeight(x, y+1, grid, state, counter);  //  Vertical line
  }
  // return counter;
}