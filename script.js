//constructor function for cell
//j = row , i = column
class cell {
    constructor(i , j ){
        this.i = i;
        this.j = j;       
    }
    visited = false;
    walls = [true , true , true , true];
    

    show(){
        var x = this.i *w;
        var y = this.j *w;    
        
        if (this.walls[0]){
            //top line
            ctx.moveTo(x, y );
            ctx.lineTo(x+w , y);
        }

        if(this.walls[1]){
            //right line
            ctx.moveTo(x+w, y );
            ctx.lineTo(x+w , y+w);
        }
        if(this.walls[2]){
            //bottom lines
            ctx.moveTo(x+w, y+w );
            ctx.lineTo(x , y+w);
        }

        if(this.walls[3]){
            //left lines
            ctx.moveTo(x, y+w );
            ctx.lineTo(x , y);
        }
        
        ctx.stroke();
    
    }

    currentlyGoing(){
        this.visited = true;
        //var x = this.i *w;
        //var y = this.j *w;
        //ctx.fillStyle ='purple';
        //ctx.fillRect(x, y , w , w);
    }

    index(i , j ){
        if ( 0 <= i && i <= 9 && 0 <= j && j <= 9 ){
            return i + j*cols;    
        }
        else{
            return -1;
        }
    }

    checkNeighbours(){
        var neighbours = [];
        //console.log("check neioghbour () is called ")
        
        var top = grid[this.index(this.i , (this.j-1))];
        var right = grid[this.index((this.i +1) , this.j)];
        var bottom = grid[this.index(this.i , (this.j+1))];
        var left = grid[this.index((this.i - 1 ), this.j)];

        //console.log(top , right , bottom , left);

        if ( top && !top.visited){
            neighbours.push(top);
        }
        if (right && !right.visited){
            neighbours.push(right);
        }
        if (bottom && !bottom.visited){
            neighbours.push(bottom);
        }
        if (left && !left.visited){
            neighbours.push(left);
        }
        
        if ( neighbours.length > 0 ){
            var r = Math.floor(Math.random() * neighbours.length);
            return neighbours[r] ; 
        }
        else{
            return undefined;
        }
    }

    highlight(){
        var x = this.i *w;
        var y = this.j *w;
        ctx.fillStyle ='green';
        ctx.fillRect(x, y , w , w);
    }
}


var Mycanvas = document.getElementById('Mycanvas');

Mycanvas.setAttribute('width' , 600);
Mycanvas.setAttribute('height' , 600);

var ctx = Mycanvas.getContext("2d");

var width = Mycanvas.width;
var height = Mycanvas.height;

var cols , rows ; 
var w = 60;
var grid = [];
var current ;
var stack = [];

cols = width/w;
rows = height/w;
// creating all cells and keeping record of them 
for( var j = 0 ; j < rows ; j++){
    for( var i = 0 ; i < cols ; i++){
        //cell(i , j );
        grid.push(new cell(i , j ));
    }
}
//starting point for random visiting
current = grid[0];
// showing all the cells with walls 
//for ( var i = 0 ; i < grid.length ; i++){
//    grid[i].show();
//}

// going neighbour and visiting
current.visited = true;
var flag = true;
if (current.visited){
    while(flag){
        current.currentlyGoing();
        var next = current.checkNeighbours();
        // next is the random neighbour which is not visited 
        //console.log(next);
        if (next){
            //console.log(next.i , next.j );
            next.currentlyGoing();
            stack.push(current);
            removeWalls(current , next);
            current.show();
            current = next;
            flag = true;
        }
        else if (stack.length > 0 ){
            var bcell = stack.pop();
            current = bcell;
            flag = true;
        }
        else{
            //current.highlight();
            flag = false;
        }
    }
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






    
