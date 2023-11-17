// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridOne;

function setup() {
  createCanvas(windowWidth, windowHeight);

  gridOne = new Grid(0);
  gridOne.generateEmpty();
}

function draw() {
  background(220);
  
  gridOne.display();
}

class Grid {
  constructor(xOffset){
    this.GRID_HEIGHT = 60;
    this.GRID_WIDTH = 120;
    
    this.grid = [];
    this.cellSize = 10;

    this.xOffset = xOffset;

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
        rect(x*this.cellSize - this.xOffset, y*this.cellSize, this.cellSize, this.cellSize);
      }
    }
  }
}

// class Veiw {
//   constructor(){

//   }
// }

// class conroller {
//   constructor(){

//   }
// }
