var cols, rows;
var w = 75;
var grid = [];
var current;
var col = 0;
var stack = [];
var rising = false;

function setup() {
  createCanvas(1895, 975);
  cols = floor(width/w);
  rows = floor(height/w);
  reset();
  colorMode(RGB, 100);
}

function draw() {
  background(51,10);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  // STEP 1
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    next.col = col;
    // STEP 2
    stack.push(current);

    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }

  if(col==99 || col == 0)rising = !rising;
  if(rising)col+=0.25;
  else col-=0.25;

  console.log(_.every( grid, function(c){c.visited}));
  if(_.every( grid, function(c){return c.visited}))
    reset();

}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}


function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function generateWeights(i,amount){
  var r = [];
  for (var j = 0; j < amount; j++) {
    r.push(i);
  }
  return r;
}

function reset(){
  grid = [];
  for (var   j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
}
