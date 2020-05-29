function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.neighbor = [];

  this.previous = undefined;

  this.Real_Neighbors = function() {

    let top = grid[index(i, j - 1)];
    let right = grid[index(i + 1, j)];
    let bottom = grid[index(i, j + 1)];
    let left = grid[index(i - 1, j)];

    if (top && top.walls[2] === false && this.walls[0] === false) {
      this.neighbor.push(top);
    }
    if (right && right.walls[3] === false && this.walls[1] === false) {
      this.neighbor.push(right);
    }
    if (bottom && bottom.walls[0] === false && this.walls[2] === false) {
      this.neighbor.push(bottom);
    }
    if (left && left.walls[1] === false && this.walls[3] === false) {
      this.neighbor.push(left);
    }
  };

  this.checkNeighbors = function() {
    var neighbors = [];

    let top = grid[index(i, j - 1)];
    let right = grid[index(i + 1, j)];
    let bottom = grid[index(i, j + 1)];
    let left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = Math.floor(Math.random() *neighbors.length);
      return neighbors[r];
    } else {
      return undefined;
    }
  };
  this.highlight = function(color) {
      let x = this.i * w;
      let y = this.j * w;
      ctx.fillStyle = color;
      ctx.fillRect(( x + (w/4)), ( y + (w/4) ), (w/2) , (w/2) );
  };

  this.show = function() {
    let x = this.i * w;
    let y = this.j * w;

    if (this.walls[0]) {
      ctx.moveTo(x, y );
      ctx.lineTo(x+w , y);
    }
    if (this.walls[1]) {
      ctx.moveTo(x+w, y );
      ctx.lineTo(x+w , y+w);
      }
    if (this.walls[2]) {
      ctx.moveTo(x+w, y+w );
      ctx.lineTo(x , y+w);
    }
    if (this.walls[3]) {
      ctx.moveTo(x, y+w );
      ctx.lineTo(x , y);
    }
    ctx.stroke();
  };
}

function removeWalls(  c , n ){
  var x = c.i  - n.i; 
  if ( x === 1){
      c.walls[3] = false;
      n.walls[1] = false;
  }
  else if ( x === -1){
      c.walls[1] = false;
      n.walls[3] = false;
  }
  var y = c.j  - n.j; 
  if ( y === 1){
      c.walls[0] = false;
      n.walls[2] = false;
  }
  else if ( y === -1){
      c.walls[2] = false;
      n.walls[0] = false;
  }

}


function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}


