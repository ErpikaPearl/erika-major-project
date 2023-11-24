// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridOne;
let player;
let testGrid;

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
  player.gravityReal();
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

    this.speedY = 0;
    this.forceG = 0;
    this.timei = 0;
    this.timef = 0;
    this.velocityYi = 0;
    this.velocityYf = 0;

    this.gravitynum = 0;
    this.gravityspeed = 2;
    this.speedx = 0;
    this.speedy = 2;


    this.colour = "red";
  }

  display(){
    fill(this.colour);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }

  // gravity(){
  //   this.gravitynum += this.gravityspeed;
  //   this.y += this.speedy * this.gravityspeed;
  // }

  gravityReal(){
    this.timei = millis();
    // this.forceG = this.mass * this.gravity / 2; //  Calculates the value of the grvaitational force
    this.velocityYf = accelerationGravity*(millis() - this.timei) + this.velocityYi;   //  Kinematics equation to find fiinal velocity
    
    this.y = this.velocityYf;
    this.velocityYi = this.velocityYf;
    this.velocityYf = 0;
  }

  // detectCollisions(){
    
  // }
}