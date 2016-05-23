function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;
  this.col;
  this.checkNeighbors = function() {
    var weights = [];
    var neighbors = [];

    var top    = grid[index(i, j -1)];
    var right  = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left   = grid[index(i-1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
      weights.push(generateWeights(neighbors.length-1||0,10));
    }
    if (right && !right.visited) {
      neighbors.push(right);
      weights.push(generateWeights(neighbors.length-1||0,10));
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
      weights.push(generateWeights(neighbors.length-1||0,10));
    }
    if (left && !left.visited) {
      neighbors.push(left);
      weights.push(generateWeights(neighbors.length-1||0,10));
    }
    if (neighbors.length > 0) {
      var r = _.sample(_.flatten(weights));
      return neighbors[r];
    } else {
      return undefined;
    }
  }
  this.highlight = function() {
    var x = this.i*w;
    var y = this.j*w;
    noStroke();
    fill(this.col,this.col,100);
    rect(x, y, w, w);

  }

  this.show = function() {
    var x = this.i*w;
    var y = this.j*w;
    stroke(0);
    if (this.walls[0])
      line(x, y, x + w, y);
    if (this.walls[1])
      line(x + w, y, x + w, y + w);
    if (this.walls[2])
      line(x + w, y + w, x, y + w);
    if (this.walls[3])
      line(x, y + w, x, y);

    if (this.visited) {
      noStroke();
      fill(this.col,this.col,100);
      rect(x, y, w, w);
    }
  }
}
