var Mycanvas = document.getElementById('Mycanvas');


Mycanvas.setAttribute('width' , 600);
Mycanvas.setAttribute('height' , 600);
  
var ctx = Mycanvas.getContext("2d");
  
var width = Mycanvas.width;
var height = Mycanvas.height;
  
var cols , rows ; 
var w = 20;
var grid = [];
var current; 
var stack = [];

cols = width/w;
rows = height/w;
// creating all cells and keeping record of them 
for( var j = 0 ; j < rows ; j++){
    for( var i = 0 ; i < cols ; i++){
        var cell = new Cell(i, j);
        grid.push(cell);
    }
}

current = grid[0];

var flag = true ;


while (flag) {
    current.visited= true;
    var next = current.checkNeighbors();
    if (next){
        stack.push(current);
        removeWalls(current , next);
        current = next;
        flag = true;
    }
    else if ( stack.length > 0){
        var bcell = stack.pop();
        current = bcell ;
        flag = true;  
    }
    else{
        flag = false;
    }
}


grid.forEach(eachCell => {
  eachCell.show();
  eachCell.visited = false;
});

var btn = document.querySelector('#btn');

stack = [];

btn.addEventListener('click' , function(){
    pathfinder();
});


















